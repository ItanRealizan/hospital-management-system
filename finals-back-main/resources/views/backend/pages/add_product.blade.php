@extends('backend.layouts.master')
@section('content')
<main>
    <div class="container-fluid px-4">
        <h1 class="mt-4">Dashboard</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                DataTable Example
            </div>
            <div class="card-body">
                <form class="row g-3 needs-validation was-validated" action="/admin/addproduct" method="POST" enctype="multipart/form-data" novalidate>
                    @csrf
                    <div class="col-md-6">
                        <label for="name" class="form-label">Product Name</label>
                        <input type="text" name="name" class="form-control" id="validationCustom01" required>
                        <div class="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="price" class="form-label">Price</label>
                        <input type="number" name="price" class="form-control" id="validationCustom02" required>
                        <div class="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">Product Category</label>
                        <select name="category" class="form-select" required aria-label="select example">
                        <option value="">Open this select menu</option>
                        <option value="Home Applience">Home Applience</option>
                        <option value="Mobile & Computer">Mobile & Computer</option>
                        <option value="Automobile">Automobile</option>
                        </select>
                        <div class="invalid-feedback">Example invalid select feedback</div>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea" class="form-label">Product Detail</label>
                        <textarea name="description" class="form-control" id="validationTextarea" placeholder="Required example textarea" required></textarea>
                        <div class="invalid-feedback">
                        Please enter a message in the textarea.
                        </div>
                    </div>
                    <div class="mb-3">
                        <input type="file" name="gallery" class="form-control" aria-label="file example" required>
                        <div class="invalid-feedback">Example invalid form file feedback</div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
@endsection