@extends('layouts.master')
@section('content')

<?php
// total amount calculation
    $total=0;
    foreach($data as $key=>$item){
        $total += $item->price*$item->qty;
    }
?>
    <!-- search result section -->
    <div class="col-8 m-auto bg-white p-3 mt-3">
        <div class="row g-1 border-bottom">
            <h3 class="col-9">Shopping Cart</h3>
            <a class="btn btn-primary col-3 mb-1" href="/checkout">Order Now</a>
        </div>
        <div class="border-bottom">
        <table class="table table-striped table-hover">
            <tbody>
                <tr>
                    <td>Price</td>
                    <td>৳ {{$total}}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>৳0</td>
                </tr>
                <tr>
                    <td>Delivary</td>
                    <td>৳100</td>
                </tr>
                <tr>
                    <td>Total Amount</td>
                    <td>৳{{$total+100}}</td>
                </tr>
            </tbody>
        </table>

        <form action="/orderplace" method="POST">
            @csrf
            <div class="form-group">
                <label for="address">Delivery Address:</label>
                <textarea class="form-control" name="address" id="address" cols="30" rows="2" required></textarea>
            </div>
            <div class="form-group">
                <label for="payment">Payment Method</label>
                <p><input type="radio" name="payment" id="payment" value="cash">Online Payment</p>
                <p><input type="radio" name="payment" id="payment" value="cash">EMI Payment</p>
                <p><input type="radio" name="payment" id="payment" value="cash">Cash on Delivery</p>
            </div>
            <button class="btn btn-primary" type="submit">Order Now</button>
        </form>
        </div>
    </div>

@endsection
