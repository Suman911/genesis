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
            1 => 'show',
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
            1 => 'show',
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
  ),
);