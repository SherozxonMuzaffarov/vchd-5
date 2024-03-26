<template>
    <div class="container mt-1">
      <div class="d-flex align-items-center gap-2">
        <p class="lead m-0"><i class="bi bi-house-door-fill"></i> Foydalanuvchilar</p>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <span class="material-icons">person_add</span>
        </button>
      </div>
  
      <!-- Modal create -->
    <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Create</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input v-model="FormData.name" placeholder="FIO" class="form-control mb-3" />
              <input v-model="FormData.phone_number" placeholder="telefon raqami" class="form-control mb-3" />
              <input v-model="FormData.password" placeholder="parol" class="form-control mb-3" />  
              
              <select v-model="FormData.role" class="form-select mb-3">
                <option :value="null" disabled>-- Role --</option>
                <option v-for="role in roles" :key="role.value" :value="role.value">{{ role.text }}</option>
              </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiqish</button>
              <button type="button" class="btn btn-primary" @click="handleOk">Saqlash</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal create -->
  
      <!-- Table -->
      <table class="table table-striped table-hover table-bordered mt-4">
        <thead>
          <tr>
            <th class="id-tr">ID</th>
            <th>Nomi</th>
            <th>Telefon raqami</th>
            <th>Roli</th>
            <th class="btns"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in Data" :key="item._id">
            <td class="id-tr">{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.role }}</td>
            <td class="btns">
              <button @click="getOne(item._id)" class="btn btn-primary m-0">
                <i class="bi bi-pen-fill"></i>
              </button>
            </td>
            <td class="btns">
              <button @click="deleteItem(item._id)" class="btn btn-danger m-0">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Table -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const modalCreate = ref(false);
  const Data = ref([]);
  
  const FormData = ref({
    _id: null,
    name: null,
    phone_number: null,
    password: null,
    role: null,
  });
  
  let depos = ref();
  
  const roles = ref([
    { value: "admin", text: "admin" },
    { value: "g'ildirakSexi", text: "g'ildirakSexi" },
  ]);
  
  // create
  const handleOk = async () => {
    try {
      let res = await axios.post("/user/create", FormData.value);
      if (res) {
        getAll();
        modalCreate.value = !modalCreate.value;
        FormData.value._id = null;
        FormData.value.name = null;
        FormData.value.phone_number = null;
        FormData.value.password = null;
        FormData.value.role = null;
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // delete
  const deleteItem = async (id) => {
    try {
      if (!id) return;
      let confirmDelete = confirm("Tasdiqlaysizmi?");
      if (confirmDelete) {
        let res = await axios.delete("/user/delete/" + id);
        alert("Ma'lumot o'chirildi");
        getAll();
      } else {
        console.log("Delete cancelled");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // getAll
  let getAll = async () => {
    try {
      let res = await axios.get("/user/all");
      if (res.data) {
        Data.value = res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // getOne
  let getOne = async (id) => {
    try {
      let res = await axios.get("/user/one/" + id);
      if (res.data) {
        FormData.value = res.data;
        modalCreate.value = !modalCreate.value;
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // getAllDepos
  let getAllDepos = async () => {
    try {
      let res = await axios.get("/depo/all");
      if (res.data) {
        depos = res.data.map(function (depo) {
          return { text: depo.name, value: depo._id };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(() => {
    getAll();
    getAllDepos();
  });
  </script>
  
  <style scoped>
  .id-tr {
    width: 23px;
    text-align: center;
  }
  
  .btns {
    width: 70px;
    text-align: center;
  }
  </style>
  