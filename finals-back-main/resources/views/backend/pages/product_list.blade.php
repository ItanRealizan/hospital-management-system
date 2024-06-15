@extends('backend.layouts.master')
@section('content')
<main>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Product View</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard/Product List</li>
        </ol>
        @if($message = session()->pull('status'))
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                {{$message}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                Product List
            </div>
            <div class="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        @forelse ($data as $product)
                        <tr>
                            <td>{{$product->name}}</td>
                            <td>{{$product->price}}</td>
                            <td>{{$product->category}}</td>
                            <td>{{$product->description}}</td>
                            <td><img src="{{asset('storage/gallery/'.$product->gallery)}}" alt="Product image" class="w-75"></td>
                            <td>
                                <a href="/admin/delproduct/{{$product->id}}" class="btn btn-danger" onclick="return confirm('Want to delete?')">Delete</a>
                                <a href="/admin/editproduct/{{$product->id}}" class="btn btn-warning">Edit</a>
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