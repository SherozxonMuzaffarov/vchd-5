<template>
    <div class="m-3">
      <div class="d-flex align-items-center gap-2">
        <p class="lead m-0"><i class="bi bi-house-door-fill"></i> Ишчилар</p>
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <span class="material-icons">person_add</span>
        </button>
      </div>
  
    <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Create</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input v-model="formData.name" placeholder="FIO" class="form-control mb-3" />
              <select v-model="formData.section" class="form-select mb-3">
                <option :value="null" disabled>-- сех --</option>
                <option v-for="section in sections" :key="section.value" :value="section.value">{{ section.text }}</option>
              </select>
              <select v-model="formData.position" class="form-select mb-3">
                <option :value="null" disabled>-- должность --</option>
                <option v-for="position in positions" :key="position.value" :value="position.value">{{ position.text }}</option>
              </select>
              <input v-model="formData.level" placeholder="разряд" class="form-control mb-3" />
              <select v-model="formData.group" class="form-select mb-3">
                <option :value="null" disabled>-- Режим работы --</option>
                <option v-for="group in groups" :key="group.value" :value="group.value">{{ group.text }}</option>
              </select>
              <!-- <div v-for="(file, index) in formData.files" :key="index" class="mb-3">
                <input v-model="file.name" placeholder="File Name" class="form-control" />
                <input placeholder="Image URL" class="form-control mt-2" type="file"/>
              </div>
              <button @click="addFiles" class="btn btn-success text-end">
              <i class="bi bi-plus-lg"></i>
            </button> -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiqish</button>
              <button type="button" class="btn btn-primary" @click="handleOk">Saqlash</button>
            </div>
          </div>
        </div>
      </div>

        <table class="table table-striped table-hover table-bordered mt-4 lg">
          <thead>
            <tr>
              <th class="id-tr">№</th>
              <th>Ф.И.О</th>
              <th>сех</th>
              <th>должность</th>
              <th>разряд</th>
              <th>Режим работы</th>
              <th class="btns">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in Data" :key="item._id">
              <td class="id-tr">{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.section }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.level }}</td>
              <td>{{ item.group }}</td>
              <td class="btns">
                <button class="btn btn-danger m-0" @click="deleteItem(item._id)">
                  <span class="material-icons">delete</span>
                </button>
                <!-- <button class="btn btn-success m-0" @click="getOne(item._id)">
                  <span class="material-icons">update</span>
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const Data = ref([]);
  
  const formData = ref({
    name: null,
    position: null,
    level: null,
    group: null,
    section: null,

  });

//   const addFiles = () => {
//     formData.value.files.push({
//         name: null,
//         img: null
//     });
// };

  
  const positions = ref([
    { value: "head_master", text: "старший мастер" },
    { value: "group_master", text: "сменный мастер" },
    { value: "group_brigader", text: "сменный бригадир" },
    { value: "svarchik", text: "сварщик" },
    { value: "tokar", text: "токар" },
    { value: "defektoskopist", text: "дефектоскопист" },
    { value: "chilangar", text: "чилангар" },
  ]);

  const groups = ref([
    { value: "weekly", text: "5 дней в неделю" },
    { value: "first", text: "первая смена" },
    { value: "second", text: "вторая смена" }
  ]);
  
  const sections = ref([
    { value: "g'ildirakSexi", text: "ғилдирак сехи" },
  ]);
  
  // create
  const handleOk = async () => {
    try {
      let res = await axios.post("/api/employee/create", formData.value);
      if (res) {
        getAll();
        makeFormDataNull()
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const makeFormDataNull = () => {
    formData.value.name = null;
    formData.value.position = null;
    formData.value.level = null;
    formData.value.group = null;
    formData.value.section = null;
  }

const closeModal = () => {
  const modal = document.getElementById("exampleModal");
  if (modal) {
    const modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide(); 
    }
  }
};
  
  // delete
  const deleteItem = async (id) => {
    try {
      if (!id) return;
      let confirmDelete = confirm("Tasdiqlaysizmi?");
      if (confirmDelete) {
        let res = await axios.delete("/api/employee/delete/" + id);
        alert("Ma'lumot o'chirildi");
        getAll();
      } else {
        console.log("Delete cancelled");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // // delete
  // const getOne = async (id) => {
  //   try {
  //     if (!id) return;
  //       let res = await axios.delete("/api/employee/one/" + id);
  //       if (res.data) {
  //         formData.value = res.data
  //       }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  // getAll
  let getAll = async () => {
    try {
      let res = await axios.get("/api/employee/all?section=g'ildirakSexi");
      if (res.data) {
        Data.value = res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(() => {
    getAll();
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
  


   <!-- <template>
    <div>
      <video ref="video" autoplay></video>
      <canvas ref="canvas" style="display: none;"></canvas>
      <button @click="startCamera">Start Camera</button>
      <button @click="stopCamera">Stop Camera</button>
      <button @click="detectFaces">Detect Faces</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as faceapi from 'face-api.js';
  
  const video = ref(null);
  const canvas = ref(null);
  
  onMounted(() => {
    // Load face-api.js models
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]).then(startCamera);
  });
  
  onUnmounted(() => {
    stopCamera();
  });
  
  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.value.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }
  
  function stopCamera() {
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
  }
  
  async function detectFaces() {
    const videoEl = video.value;
    const canvasEl = canvas.value;
    const context = canvasEl.getContext('2d');
  
    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
  
    context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
    
    const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
                                  .withFaceLandmarks()
                                  .withFaceDescriptors();
    
    // Draw face detection boxes on the canvas
    faceapi.draw.drawDetections(canvasEl, detections);
    faceapi.draw.drawFaceLandmarks(canvasEl, detections);
  }
  </script>
   -->