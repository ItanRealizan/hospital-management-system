<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LaraBazar</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/4c9f93ac06.js" crossorigin="anonymous"></script>
    <!-- <link rel="stylesheet" href="{{ asset('/assets/css/styles.css?v='.time())}}"> -->
    <link rel="stylesheet" href="{{ asset('/assets/css/style.css?v='.time())}}">

</head>
<body>
    {{View::make('layouts.header')}}
    @yield('content')
    @include('layouts.footer')
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="{{ asset('/assets/js/scripts.js')}}"></script>
    <script>
         $('.toast').toast({
        delay:2000,
        // Other options
    });
    </script>
</body>
</html>