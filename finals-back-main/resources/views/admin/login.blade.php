
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/4c9f93ac06.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('/assets/css/style.css?v='.time())}}">
</head>
<body class="">
    <div class="container position-absolute top-50 start-50 translate-middle">
        <div class="row my-5 align-middle">
            <div class="col-md-4 m-auto bg-white rounded p-5">
                <h4>Hell<i class="fas fa-power-off fs-6"></i>! let's get started </h4>
                <h6 class="fw-light">Admin Sign in to continue.</h6>
                    @if($message = session()->pull('status'))
                        <div class="alert alert-success">{{$message}}</div>
                    @endif
                <form action="{{route('admin.auth')}}" method="POST" class="mt-4">
                    @csrf
                    <div class="form-group mt-3">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group mt-3">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                    </div>
                    
                    <div class="d-grid mt-3">
                        <button type="submit" class="btn btn-primary rounded-pill" name="login">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>

