<template>
    <main>
        
        <h3>Журнал</h3>
        <h4>Ремонта роликовых подшипников</h4>
        
        <!-- Filter -->
        <div class="row mt-5">
        <div class="col-12">
            <div class="card shadow-sm">
            <div class="card-body ">
                <div class="row gy-3">
                    <button class="btn btn-success d-flex align-items-center justify-content-center fs-6 m-3 col" @click="addData">
                        <i class="bi bi-plus-circle me-2"></i>
                        <span>Add</span>
                    </button>
                    <div class="col-10">
                        <div>
                            <BFormRadioGroup
                            id="radio-group-1"
                            v-model="groupedSelected"
                            :options="groupedOptions"
                            name="radio-options"
                            />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
         <!-- List -->
        <div class="mt-5">
            <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
                <div class="card-body">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr >
                            <BTd rowspan="2">№</BTd>
                            <BTd rowspan="2">Дата ремонта <br> подшипника </BTd>
                            <BTd >Условное обозначение, номер <br> завода изготовления и дата</BTd>
                            <BTd colspan="2">Вид</BTd>
                            <BTd colspan="2">Подпись</BTd>
                            
                        </BTr>
                        <BTr >
                            <BTd >изготовления подшипника</BTd>
                            <BTd >неисправности</BTd>
                            <BTd >произведенного ремонта</BTd>
                            <BTd >Лица, производившего <br> ремонт </BTd>
                            <BTd >мастера</BTd>
                            
                        </BTr>
                    </BThead>
                    <BTbody>
                        <BTr v-show="addToggle">
                            <BTd><BFormInput v-model="formData.register_number" /></BTd>
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd><BFormInput v-model="formData.depoManifactured" /></BTd>
                            <BTd><BFormInput v-model="formData.defect" /></BTd>
                            <BTd><BFormInput v-model="formData.repairDone" /></BTd>
                            <BTd > 
                                <BFormSelect v-model="formData.repairman" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Лица, производившего ремонт --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd >
                                <BFormSelect v-model="formData.master" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--мастер --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd ><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr>
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd>{{ item?.register_number }}</BTd>
                            <BTd>{{ item?.register_time }}</BTd>
                            <BTd >{{ item?.depoManifactured }}</BTd>
                            <BTd>{{ item?.defect }}</BTd>
                            <BTd>{{ item?.repairDone }}</BTd>
                            <BTd>
                                {{ item?.repairman?.name }}
                                 <span v-if="item?.is_repairman_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd>
                                {{ item?.master?.name }}
                                 <span v-if="item?.is_master_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="getOne(item._id, item.status)">
                                    <i class="bi bi-pen-fill"></i>
                                </button>
                            </BTd>
                        </BTr>
                    </BTbody>
                </BTableSimple>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const addToggle = ref(false)
const Data = ref([])
const employeeList = ref([])

const formData = ref({
    register_number: '',
    register_time: '',
    depoManifactured: '',
    defect: '',
    repairDone: '',
    repairman: '',
    status: ''
})

const groupedOptions = [
  {text: 'ЎТЙ', value: 'ЎТЙ'},
  {text: 'СНГ', value: 'СНГ'},
  {text: 'СОБ', value: 'СОБ'},
]

const groupedSelected = ref()

const addData = () => {
    makeFormNull()
    formData.value.status = groupedSelected.value
    addToggle.value = !addToggle.value
}

const saveData = async() => {
    try {
        if (formData.value._id) {
            const isConfirmed = confirm("O'zgarishni Saqlamoqchimisiz?");
            if(isConfirmed) {
                let res = await axios.patch("/api/gildirak-sexi/vu-93/update/" + formData.value._id, formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }
        }else {
            const isConfirmed = confirm("Saqlamoqchimisiz");
            if(isConfirmed) {
                let res = await axios.post("/api/gildirak-sexi/vu-93/create", formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }  
        }
        
    } catch (error) {
        console.error(error);
    }
}

const makeFormNull = () => {
    formData.value.register_number= null,
    formData.value.register_time= null,
    formData.value.depoManifactured= null,
    formData.value.defect= null,
    formData.value.repairDone= null,
    formData.value.repairman= null,
    formData.value.master= null,
    formData.value.status= null
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/gildirak-sexi/vu-93/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = res.data;
        }

    } catch (error) {
        console.error(error);
    }
}

const getOne = async(id, status) => {
    try {
        let res = await axios.get("/api/gildirak-sexi/vu-93/one/" + id  + '/' + status);
        if (res.data) {
            addData()
            formData.value = res.data;
        }
    } catch (error) {
        console.error(error);
    }
}

// allEmployee
const allEmployee = async() => {
    try {
    let res = await axios.get(`/api/employee/all?section=g'ildirakSexi`);
    if (res.data) {
        employeeList.value = res.data.map(function (item) {
            return { text: item.name, value: item._id};
        });
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
    groupedSelected.value = 'ЎТЙ';
    formData.value.status = groupedSelected.value;
    getAll();
    allEmployee();
});

watch(
  [groupedSelected],
  async () => {
    formData.value.status = groupedSelected.value;
    getAll();
  },
  { deep: true }
);


</script>

<style lang="scss" scoped>

.vertical-text {
    writing-mode: vertical-rl; 
    transform: rotate(180deg);
    white-space: nowrap; 
}

.center-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>