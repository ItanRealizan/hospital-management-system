@extends('layouts.master')
@section('content')
<div class="container vh-100">
    <div class="row my-5">
        <div class="col-md-4 m-auto bg-white rounded p-5">
            <h4>Hell<i class="fas fa-power-off fs-6"></i>! let's get started </h4>
            <h6 class="fw-light">Sign up to continue.</h6>
            <form action="/register" method="POST" class="mt-4">
                @csrf
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Name">
                    {!!$errors->first("name", "<small class='text-danger'>:message</small>")!!}
                </div>
                <div class="form-group mt-3">
                    <label for="email">Email Id</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email">
                    {!!$errors->first("email", "<small class='text-danger'>:message</small>")!!}
                </div>
                <div class="form-group mt-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                    {!!$errors->first("password", "<small class='text-danger'>:message</small>")!!}
                </div>
                <div class="form-group mt-3">
                    <label for="confirm_password">Password</label>
                    <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Retype password">
                    {!!$errors->first("confirm_password", "<small class='text-danger'>:message</small>")!!}
                </div>

                <div id="emailHelp" class="form-text">Have an account? <a class="text-decoration-none" href="/login">Login</a></div>
                
                <div class="d-grid mt-3">
                    <button type="submit" class="btn btn-primary rounded-pill" name="register">Register</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection