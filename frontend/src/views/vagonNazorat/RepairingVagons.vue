<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0">
        <i class="bi bi-house-door-fill"></i>Тамирга олинган вагонлар
      </p>
    </div>
    <!-- List -->
    <div class="mt-5">
      <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
        <div class="card-body">
          <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BThead class="table-dark">
              <BTr class="align-middle">
                <BTh scope="col">№</BTh>
                <BTh scope="col">Nomeri</BTh>
                <BTh scope="col">Vagon turi</BTh>
                <BTh scope="col">Oxirgi tamir turi</BTh>
                <BTh scope="col">Oxirgi tamir vaqti</BTh>
                <BTh scope="col">Depoga kelgan vaqti</BTh>
                <BTh scope="col">Ta'mir turi</BTh>
                <BTh scope="col">Yili</BTh>
                <BTh scope="col">Firma</BTh>
                <BTh scope="col">Egasi</BTh>
                <BTh scope="col">Izoh</BTh>
                <BTh scope="col" class="d-flex justify-content-center"> Ta'mirga olingan vaqti </BTh>
              </BTr>
            </BThead>
            <BTbody>
              <BTr class="align-middle" v-for="(item, index) in Data" :key="item._id">
                <BTh class="id-tr">{{ index + 1 }}</BTh>
                <BTd>{{ item?.nomer }}</BTd>
                <BTd>{{ item?.vagon_type }}</BTd>
                <BTd>{{ item?.last_repair_type }}</BTd>
                <BTd>{{ item?.last_repair_year }}</BTd>
                <BTd>{{ item?.createdAt }}</BTd>
                <BTd>{{ item?.repair_type}}</BTd>
                <BTd>{{ item?.year }}</BTd>
                <BTd>{{ item?.owner_company_id?.name }}</BTd>
                <BTd>{{ item?.owner_id?.name }}</BTd>
                <BTd>{{ item?.remain_comment }}</BTd>
                <BTd class="d-flex justify-content-center">{{item?.timeOfRepair}}</BTd>
              </BTr>
            </BTbody>
          </BTableSimple>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userData = ref({});
const Data = ref([]);

// Define the formatDate function
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'UTC'
  };

  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}

// getAllVagon function
let getAll = async () => {
  try {
    let res = await axios.get('/api/vagon/repairing-vagons');
    if (res.data) {
      Data.value = res.data.map(item => {
        item.createdAt = formatDate(item.createdAt);
        item.updatedAt = formatDate(item.updatedAt);
        item.timeOfRepair = formatDate(item.timeOfRepair);
        return item;   
      });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    userData.value = JSON.parse(storedUserData);
  }
  getAll();
});
</script>

<style lang="scss" scoped>
.id-tr {
  width: 23px;
  text-align: center;
}

.btns {
  width: 70px;
  text-align: center;
}
</style>
