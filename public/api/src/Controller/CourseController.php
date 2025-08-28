<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\CourseRepository;

final class CourseController extends Controller
{
    public function __construct()
    {
        $this->repository = new CourseRepository();
    }

    public function counts(Request $request, Response $response)
    {
        $counts = $this->repository->getCounts();
        $response->send($counts);
    }

    private function getStudentCount(array $course): array
    {
        $total = 0;

        foreach ($course['batches'] as &$batch) {
            $batch['student_count'] = $this->repository->getStudentCountForBatch($batch['id']);
            $total += $batch['student_count'];
        }

        $course['student_count'] = $total;
        return $course;
    }

    public function index(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $courses = $this->repository->getAllCoursesWithBatches();

        foreach ($courses as &$course) {
            $course = $this->getStudentCount($course);
        }

        $response->send($courses);
    }

    public function names(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $active = (bool) ($request->getQueryParams()['active'] ?? 0);
        $courses = $this->repository->getCourseBatch($active);

        $response->send($courses);
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = (int) ($request->getParams()['id'] ?? 0);

        $data = $request->getBody();

        try {
            $this->repository->startTransaction();

            $isNew = $id === 0;

            $courseData = [
                'name' => $data['name'] ?? null,
                'active' => $data['active'] ?? 1,
            ];

            // Create or update the course
            $course = $isNew
                ? $this->repository->createCourse($courseData)
                : $this->repository->updateCourse($id, $courseData);

            if (!$course || !isset($course['id'])) {
                throw new \RuntimeException('Failed to save course.');
            }

            $courseId = (int) $course['id'];

            // Process batches
            if (!empty($data['batches']) && is_array($data['batches'])) {
                foreach ($data['batches'] as $batch) {
                    $batchId = (int) ($batch['id'] ?? 0);

                    $batchData = [
                        'course_id' => $courseId,
                        'name' => $batch['name'] ?? '',
                        'active' => $batch['active'] ?? 1,
                        'seq' => $batch['seq'] ?? null,
                    ];

                    $success = $batchId > 0
                        ? $this->repository->updateBatch($batchId, $batchData)
                        : $this->repository->createBatch($batchData);

                    if (!$success) {
                        throw new \RuntimeException('Failed to save batch.');
                    }
                }
            }

            $this->repository->commitTransaction();

            // Return updated or created course with batches
            $updatedCourse = $this->repository->getCourseById($courseId);
            $updatedCourse = $this->getStudentCount($updatedCourse);
            $response->send($updatedCourse);

        } catch (\Throwable $e) {
            $this->repository->rollbackTransaction();
            $response->error(500, 'Course save failed: ' . $e->getMessage());
        }
    }

    public function delete(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'];

        $this->validateId($response, $id);

        try {
            // Check if the course has batches
            $batches = $this->repository->getBatchesByCourseId($id);
            if (!empty($batches)) {
                $response->error(400, 'Cannot delete course with batches.');
                return;
            }

            // Delete the course
            $this->repository->deleteCourse($id);
            $response->send(['message' => 'Course deleted successfully.']);

        } catch (\Throwable $e) {
            $response->error(500, 'Course deletion failed: ' . $e->getMessage());
        }
    }

    public function deleteBatch(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'];

        $this->validateId($response, $id);

        try {
            // Check if the batch has students
            $studentCount = $this->repository->getStudentCountForBatch($id);
            if ($studentCount > 0) {
                $response->error(400, 'Cannot delete batch with students.');
                return;
            }

            // Delete the batch
            $this->repository->deleteBatch($id);
            $response->send(['message' => 'Batch deleted successfully.']);

        } catch (\Throwable $e) {
            $response->error(500, 'Batch deletion failed: ' . $e->getMessage());
        }
    }
}
