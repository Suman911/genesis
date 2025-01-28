<?php return array (
  'GET' => 
  array (
    '' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        Closure::__set_state(array(
        )),
        'middlewares' => 
        array (
        ),
      ),
    ),
    'users' => 
    array (
      '{param}' => 
      array (
        '_name' => 'id',
        '{param}' => 
        array (
          '_name' => 'post',
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
        ),
      ),
    ),
    'params' => 
    array (
      '{param}' => 
      array (
        '_name' => 'a',
        '{param}' => 
        array (
          '_name' => 'b',
          'c' => 
          array (
            '{param}' => 
            array (
              '_name' => 'd',
              '_handler' => 
              array (
                'handler' => 
                array (
                  0 => 'Api\\Controller\\UserController',
                  1 => 'params',
                ),
                'middlewares' => 
                array (
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  ),
  'POST' => 
  array (
    'users' => 
    array (
      '_handler' => 
      array (
        'handler' => 
        array (
          0 => 'Api\\Controller\\UserController',
          1 => 'store',
        ),
        'middlewares' => 
        array (
          0 => 'Api\\Middleware\\AuthMiddleware',
        ),
      ),
    ),
  ),
);