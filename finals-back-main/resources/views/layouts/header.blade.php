<?php
  use App\Http\Controllers\ProductController;
  $total=0;
  if (Session::get('user')) {
    $total = ProductController::cartItem();
  }
  
?>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container px-4 px-lg-5">
    <a class="navbar-brand" href="/">
      <img src="{{ asset('/assets/img/logo.png')}}" alt="LaraBazar">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contact">Contact</a>
        </li>
        <li class="nav-item">
        </li>
      </ul>
      <form class="d-flex mx-5 input-group" action="\search" method="GET">
        <input name="query" class="form-control" type="search" placeholder="Search with product name" aria-label="Search">
        <button class="btn btn-outline-light input-group-text" type="submit" id="btnsearch"><i class="fas fa-search"></i></button>
      </form>
      <div class="d-flex">
        <a href="/cartlist" class="btn text-warning"><i class="fab fa-opencart"></i> Cart({{$total}})</a>
      </div>
      <div class="d-flex nav-item dropdown">
        @if(Session::get('user'))
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{Session::get('user')['name']}}</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="/logout">Logout</a></li>
          </ul>
        @else
        <a class="nav-link text-white" href="/user_login">Login</a>
        @endif
      </div>
      <div class="d-flex nav-item">
        @if(!Session::get('user'))
        <a class="nav-link text-white" href="/register">Register</a>
        @endif
      </div>
    </div>
  </div>
</nav>