@extends('layouts.master')
@section('content')
<!-- Product-page -->
  <div class="row my-4 container bg-light m-auto">
      <div class="col-12 col-md-6">
          <img src="{{asset('storage/gallery/'.$product['gallery'])}}" alt="Product image" class="card-img"> 
      </div>
      <div class="col-12 col-md-6 mt-5">
          <h4>{{$product->name}}</h4> 
          <div class="ratings text-warning">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-half-alt"></i>
              <i class="fa fa-star-o"></i>
              (2)
          </div>
          <p><b>Brand: </b> Sony</p>
          <p><b>Category: </b> {{$product->category}}</p>
          <p><b>Price: </b>৳{{$product->price}}</p>
          <p> 
              <form action="/add_to_cart" method="post">
                @csrf
                <label for="qu"><b>Quantity:</b> </label> 
                <input class="form-control-sm text-center me-3" id="qty" type="number" name="qty" min="1" value="1" style="max-width: 5rem" required />
                <input type="hidden" name="product_id" value="{{$product->id}}">
                <br>
                <button href="#" class="btn btn-outline-primary mt-3" type="submit" id="button-addon1" >
                    <i class="fas fa-cart-plus px-2"></i> Add To Cart
                </button>
              </form>
            </p> 
      </div>
      <div class="col-12 bg-light mt-3 border-top">
          <div class="p-3 details-2 ">
              <h4 class="fw-bold">Product Details</h4>
              <p>{{$product->description}}</p>
          </div>
      </div>
  </div>
@endsection