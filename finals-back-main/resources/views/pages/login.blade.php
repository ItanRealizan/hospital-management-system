@extends('layouts.master')
@section('content')
<div class="container vh-100">
    <div class="row my-5">
        <div class="col-md-4 m-auto bg-white rounded p-5">
            <h4>Hell<i class="fas fa-power-off fs-6"></i>! let's get started </h4>
            <h6 class="fw-light">Sign in to continue.</h6>
            @if($message = Session::get('status'))
                <div class="alert alert-success">{{$message}}</div>
            @endif
            <form action="/user_login" method="POST" class="mt-4">
                @csrf
                <div class="form-group mt-3">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email">
                </div>
                <div class="form-group mt-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                </div>
                <div id="emailHelp" class="form-text">Don't have an account? <a class="text-decoration-none" href="/register">Create</a></div>
                
                <div class="d-grid mt-3">
                    <button type="submit" class="btn btn-primary rounded-pill" name="login">LOGIN</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection