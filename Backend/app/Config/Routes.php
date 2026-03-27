<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('/login', 'AuthController::login');
$routes->get('/me', 'AuthController::me');

$routes->group('user', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'UsersController::index');
    $routes->get('(:num)', 'UsersController::show/$1');
    $routes->post('/', 'UsersController::createUser');
    $routes->put('(:num)', 'UsersController::updateUser/$1');
    $routes->delete('(:num)', 'UsersController::deleteUser/$1');
});

$routes->group('roles', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'RolesController::getAll');
    $routes->post('/', 'RolesController::add');
    $routes->delete('(:num)', 'RolesController::delete/$1');
    $routes->put('(:num)', 'RolesController::update/$1');
});

$routes->group('pages', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'AccessPageController::show');
    $routes->post('/', 'AccessPageController::create');
    $routes->put('(:num)', 'AccessPageController::update/$1');
    $routes->delete('(:num)', 'AccessPageController::delete/$1');
});

$routes->group('contact', static function ($routes) {
    // $routes->get('/', 'ContactController::index');
    $routes->get('/', 'ContactController::getAllContact');
    $routes->post('/', 'ContactController::createContact');
    $routes->put('(:num)', 'ContactController::updateContact/$1');
    $routes->delete('(:num)', 'ContactController::deleteContact/$1');
    $routes->put('status/(:num)', 'ContactController::activateContact/$1');
});

$routes->group('dean', ['filter' => 'auth'], static function ($routes) {
    // $routes->get('/', 'DeanController::index');
    $routes->get('/', 'DeanController::getAllDean');
    $routes->post('/', 'DeanController::createDean');
    $routes->put('(:num)', 'DeanController::updateDean/$1');
    $routes->delete('(:num)', 'DeanController::deleteDean/$1');
    $routes->put('status/(:num)', 'DeanController::activateDean/$1');
});

$routes->group('faculty', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'FacultyController::index');
    $routes->get('show/(:num)', 'FacultyController::getFacultyData/$1');
    $routes->get('/all', 'FacultyController::getAllFaculty');
    $routes->post('/', 'FacultyController::createFaculty');
    $routes->put('(:num)', 'FacultyController::updateFaculty/$1');
    $routes->delete('(:num)', 'FacultyController::deleteFaculty/$1');
    $routes->put('status/(:num)', 'FacultyController::activateFaculty/$1');
});

$routes->group('prodi', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'ProdiController::index');
    $routes->post('/', 'ProdiController::create');
    $routes->put('(:num)', 'ProdiController::update/$1');
    $routes->delete('(:num)', 'ProdiController::delete/$1');
});

$routes->group('organization', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'OrganizationController::get');
    $routes->get('level', 'OrganizationController::index');
    $routes->post('/', 'OrganizationController::create');
    $routes->put('(:num)', 'OrganizationController::update/$1');
    $routes->delete('(:num)', 'OrganizationController::delete/$1');
});

$routes->group('dosen', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'DosenController::index');
    $routes->post('/', 'DosenController::create');
    $routes->put('(:num)', 'DosenController::update/$1');
    $routes->delete('(:num)', 'DosenController::delete/$1');
});

$routes->group('cooperation', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'CooperationController::index');
    $routes->get('(:num)', 'CooperationController::getByIdCooperation/$1');
    $routes->get('filter', 'CooperationController::filterCooperation');
    $routes->get('all', 'CooperationController::getAllCooperation');
    $routes->get('justprodi', 'CooperationController::getWithProdiOnly');
    $routes->get('justprodi/(:num)', 'CooperationController::getBaseProdi/$1');
    $routes->post('/', 'CooperationController::createCooperation');
    $routes->get('graphmonth/(:num)/(:alpha)', 'CooperationController::graphCooperationMonth/$1/$2');
    $routes->get('graphyear/(:num)/(:alpha)', 'CooperationController::graphCooperationYear/$1/$2');
    $routes->put('(:num)', 'CooperationController::updateCooperation/$1');
    $routes->delete('(:num)', 'CooperationController::deleteCooperation/$1');
});

$routes->group('implementation', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'ImplementationController::getImplementation');
    $routes->get('(:num)', 'ImplementationController::getProdiImplementation/$1');
    $routes->get('all', 'ImplementationController::getAllImplementation');
    $routes->get('graphmonth', 'ImplementationController::graphImplementationMonth');
    $routes->post('(:num)', 'ImplementationController::createImplementation/$1');
    $routes->post('(:num)/(:num)', 'ImplementationController::updateImplementation/$1/$2');
    $routes->delete('(:num)', 'ImplementationController::deleteImplementation/$1');
});

$routes->group('type', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'TypeController::index');
    $routes->post('/', 'TypeController::create');
    $routes->put('(:num)', 'TypeController::update/$1');
    $routes->delete('(:num)', 'TypeController::delete/$1');
});

$routes->group('documentation', ['filter' => 'auth'], static function ($routes) {
    $routes->get('/', 'DocumentationController::index');
    $routes->get('all', 'DocumentationController::getAllDocumentation');
    $routes->post('(:num)', 'DocumentationController::createDocumentation/$1');
    $routes->post('(:num)/(:num)', 'DocumentationController::updateDocumentation/$1/$2');
    $routes->delete('(:num)', 'DocumentationController::deleteDocumentation/$1');
});
