<template>
  <div class="register">
    <h1>Inscription</h1>

    <form method="post" action="/order" novalidate>
      <div class="form-row">
        <div class="col-sm-12 col-md-6 mb-3">
          <label for="firstName">Prénom</label>
          <input
            type="text"
            maxlength="30"
            class="form-control"
            id="firstName"
            name="firstName"
            value="Value"
          />
        </div>
        <div class="col-sm-12 col-md-6 mb-3">
          <label for="lastName">Nom</label>
          <input
            type="text"
            maxlength="30"
            class="form-control"
            id="lastName"
            name="lastName"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-sm-12 col-md-6 mb-3">
          <label for="address">Adresse</label>
          <input
            type="text"
            maxlength="50"
            class="form-control"
            id="address"
            name="address"
          />
        </div>
        <div class="col-sm-12 col-md-3 mb-3">
          <label for="city">Ville</label>
          <input
            type="text"
            maxlength="30"
            class="form-control"
            id="city"
            name="city"
          />
        </div>
        <div class="col-sm-12 col-md-3 mb-3">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" name="email" />
        </div>
      </div>
      <input
        type="submit"
        class="mt-4 btn btn-primary btn-lg btn-block"
        value="Commander"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
};
</script>
