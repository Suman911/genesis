<?php return array (
  'GET' => 
  array (
    '' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\Controller',
          1 => 'index',
        ),
        'middlewares' => 
        array (
        ),
      ),
    ),
    'users' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\UserController',
          1 => 'index',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\UserController',
            1 => 'fetch',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      'me' => 
      array (
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\UserController',
            1 => 'me',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'admins' => 
    array (
      'me' => 
      array (
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\UserController',
            1 => 'meAdmin',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\UserController',
          1 => 'getAdmins',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
    ),
    'notices' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\NoticeController',
          1 => 'index',
        ),
        'middlewares' => 
        array (
        ),
      ),
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\NoticeController',
            1 => 'fetch',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'testimonials' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\TestimonialController',
          1 => 'index',
        ),
        'middlewares' => 
        array (
        ),
      ),
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\TestimonialController',
            1 => 'fetch',
          ),
          'middlewares' => 
          array (
          ),
        ),
      ),
    ),
    'courses' => 
    array (
      'counts' => 
      array (
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\CourseController',
            1 => 'counts',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      'names' => 
      array (
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\CourseController',
            1 => 'names',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\CourseController',
          1 => 'index',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
    ),
    'students' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\StudentController',
          1 => 'index',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\StudentController',
            1 => 'show',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      'unassign' => 
      array (
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\StudentController',
            1 => 'unassigned',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
  ),
  'POST' => 
  array (
    'login' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\UserController',
          1 => 'login',
        ),
        'middlewares' => 
        array (
        ),
      ),
    ),
    'logout' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\UserController',
          1 => 'logout',
        ),
        'middlewares' => 
        array (
        ),
      ),
    ),
    'users' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\UserController',
          1 => 'create',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
    ),
    'notices' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\NoticeController',
          1 => 'create',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\NoticeController',
            1 => 'update',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'testimonials' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\TestimonialController',
          1 => 'create',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
    ),
    'students' => 
    array (
      'assign' => 
      array (
        '{param}' => 
        array (
          '_name' => 'id',
          '_handler' => 
          array (
            'handler' => 
            array (
              0 => 'Api\\Controller\\StudentController',
              1 => 'assignToBatch',
            ),
            'middlewares' => 
            array (
              0 => 'Api\\Middleware\\AuthMiddleware',
            ),
          ),
        ),
      ),
    ),
  ),
  'PUT' => 
  array (
    'users' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\UserController',
            1 => 'update',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      'password' => 
      array (
        '{param}' => 
        array (
          '_name' => 'id',
          '_handler' => 
          array (
            'handler' => 
            array (
              0 => 'Api\\Controller\\UserController',
              1 => 'updatePassword',
            ),
            'middlewares' => 
            array (
              0 => 'Api\\Middleware\\AuthMiddleware',
            ),
          ),
        ),
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\UserController',
            1 => 'updatePassword',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'testimonials' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\TestimonialController',
            1 => 'update',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'courses' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\CourseController',
            1 => 'update',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'students' => 
    array (
      'status' => 
      array (
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\StudentController',
            1 => 'updateStatus',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\StudentController',
            1 => 'update',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
  ),
  'DELETE' => 
  array (
    'users' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\UserController',
            1 => 'delete',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'notices' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\NoticeController',
            1 => 'delete',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'testimonials' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\TestimonialController',
            1 => 'delete',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
    'courses' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\CourseController',
            1 => 'delete',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
      'batch' => 
      array (
        '{param}' => 
        array (
          '_name' => 'id',
          '_handler' => 
          array (
            'handler' => 
            array (
              0 => 'Api\\Controller\\CourseController',
              1 => 'deleteBatch',
            ),
            'middlewares' => 
            array (
              0 => 'Api\\Middleware\\AuthMiddleware',
            ),
          ),
        ),
      ),
    ),
    'students' => 
    array (
      'unassign' => 
      array (
        '{param}' => 
        array (
          '_name' => 'sid',
          '{param}' => 
          array (
            '_name' => 'bid',
            '_handler' => 
            array (
              'handler' => 
              array (
                0 => 'Api\\Controller\\StudentController',
                1 => 'unassignStudent',
              ),
              'middlewares' => 
              array (
                0 => 'Api\\Middleware\\AuthMiddleware',
              ),
            ),
          ),
        ),
      ),
      '{param}' => 
      array (
        '_name' => 'id',
        '_handler' => 
        array (
          'handler' => 
          array (
            0 => 'Api\\Controller\\StudentController',
            1 => 'delete',
          ),
          'middlewares' => 
          array (
            0 => 'Api\\Middleware\\AuthMiddleware',
          ),
        ),
      ),
    ),
  ),
);