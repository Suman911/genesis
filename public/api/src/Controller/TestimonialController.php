<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\TestimonialRepository;

final class TestimonialController extends Controller
{
    private $testimonialRepository;

    public function __construct()
    {
        $this->testimonialRepository = new TestimonialRepository();
    }

    private function validateTestimonialData(Response $response, array $data)
    {
        foreach (['message', 'image', 'name'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    public function index(Request $request, Response $response)
    {
        $testimonials = $this->testimonialRepository->getAllTestimonials();
        $response->send($testimonials);
    }

    public function fetch(Request $request, Response $response)
    {
        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $testimonial = $this->testimonialRepository->getTestimonialById($id);

        if ($testimonial) {
            $response->send(['testimonial' => $testimonial]);
        } else {
            $response->error(404, 'Testimonial not found');
        }
    }

    public function create(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $data = $request->getBody();
        $this->validateTestimonialData($response, $data);

        $testimonial = $this->testimonialRepository->createTestimonial($data);

        if (!$testimonial) {
            $response->error(500, 'Failed to create testimonial');
            return;
        }

        $response->setStatusCode(201)->send($testimonial);
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $data = $request->getBody();
        $this->validateTestimonialData($response, $data);

        $testimonial = $this->testimonialRepository->updateTestimonial($id, $data);

        if (!$testimonial) {
            $response->error(500, 'Failed to update testimonial');
            return;
        }

        $response->send($testimonial);
    }

    public function delete(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $deleted = $this->testimonialRepository->deleteTestimonial($id);

        if (!$deleted) {
            $response->error(500, 'Failed to delete testimonial');
            return;
        }

        $response->send(['message' => "Testimonial with ID $id deleted"]);
    }
}