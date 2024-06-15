@extends('layouts.master')
@section('content')
    <!-- search result section -->
    <div class="col-8 m-auto">
        <h3 class="mt-3 text-center">Search items found for "{{$query}}"</h3>
        @forelse($data as $key=>$product)
        <div class="card my-3  m-auto" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="{{$product['gallery']}}" class="img-fluid rounded-start" alt="product pic">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <a href="detail/{{$product['id']}}" class="text-decoration-none underline">
                            <h5 class="card-title">{{$product['name']}}</h5>
                            <p class="card-text">{{$product['description']}}</p>
                        </a>
                        <p class="card-text"><small class="text-danger">৳{{$product['price']}}</small></p>
                    </div>
                </div>
            </div>
        </div>
        @empty
        <div class="text-danger fs-4 text-center">Soory, No result found!!</div>
        @endforelse
    </div>

@endsection