@extends('backend.layouts.master')
@section('content')
<main>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Order List</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard/Order list</li>
        </ol>
        @if($message = session('state'))
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                {{$message}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                DataTable Example
            </div>
            <div class="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Address</th>
                            <th>Payment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Address</th>
                            <th>Payment</th>
                            <th>Status</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        @forelse ($data as $order)
                        <tr>
                            <td>{{$order->uname}}</td>
                            <td>{{$order->pname}}</td>
                            <td>{{$order->pprice}}</td>
                            <td>{{$order->qty}}</td>
                            <td>{{$order->pprice*$order->qty}}</td>
                            <td>{{$order->address}}</td>
                            <td>{{$order->payment_method}}</td>
                            <td>
                                <form action="{{route('osc')}}" method="post">
                                    @csrf
                                    <input type="hidden" value="{{$order->id}}" name="id">
                                    <select name="status" id="">
                                        <option value="{{$order->status}}" selected disabled>{{$order->status}}</option>
                                        <option value="pending">pending</option>
                                        <option value="complete">complete</option>
                                    </select>
                                    <button type="submit" class="btn btn-secondary btn-sm">Save</button>
                                </form>
                                
                            </td>
                        </tr>
                        @empty
                            <p class="text-center">No record found</p>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
@endsection