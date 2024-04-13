<template>
    <main>
        <h3>Журнал</h3>
        <h4>По учёта ремонта и испитанию распорных тяга тележек грузовых вагонов</h4>
        <!-- <h4>Тележка пружиналарини синовдан ўтказишни ҳисобга олиш</h4> -->
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

        {{ formData }}

         <!-- List -->
        <div class="mt-5">
            <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
                <div class="card-body">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr >
                            <BTd >Дата <br> испитания</BTd>
                            <BTd >Колечество <br> испытываемых <br> деталей</BTd>
                            <BTd >Годность</BTd>
                            <BTd >Фамилия и <br> подпись слесаря <br> производившего <br> испитание</BTd>
                            <BTd >Фамилия и подпись <br> бригадира или <br> мастера</BTd>
                        </BTr>
                    </BThead>
                    <BTbody>
                        <BTr v-show="addToggle"> 
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd><BFormInput v-model="formData.quantity" /></BTd>
                            <BTd>
                                <BFormSelect v-model="formData.godnost" :options="godnosts" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--годность--</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd>
                                <BFormSelect v-model="formData.inspector" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--слесаря--</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd>
                                <BFormSelect v-model="formData.brigader" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--бригадира или мастера --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            
                            <BTd><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr>
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd>{{ item?.register_time }}</BTd>
                            <BTd >{{ item?.quantity }}</BTd>
                            <BTd>{{ item?.godnost}}</BTd>
                            <BTd>{{ item?.inspector?.name }}</BTd>
                            <BTd>{{ item?.brigader?.name }}</BTd>
                            
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
    register_time: '',
    quantity: '',
    godnost: '',
    inspector: '',
    brigader: '',
    status: '',
})

const godnosts = [
  {text: 'годен', value: 'годен'},
]
const groupedOptions = [
  {text: 'ЎТЙ', value: 'ЎТЙ'},
  {text: 'КЗХ', value: 'КЗХ'},
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
                let res = await axios.patch("/api/telejka-sexi/tyaga/update/" + formData.value._id, formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }
        }else {
            const isConfirmed = confirm("Saqlamoqchimisiz");
            if(isConfirmed) {
                let res = await axios.post("/api/telejka-sexi/tyaga/create", formData.value);
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
    formData.value.register_time= null,
    formData.value.quantity= null,
    formData.value.godnost= null,
    formData.value.inspector= null,
    formData.value.brigader= null,
    formData.value.status= null
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/telejka-sexi/tyaga/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = res.data;
        }

    } catch (error) {
        console.error(error);
    }
}

const getOne = async(id, status) => {
    try {
        let res = await axios.get("/api/telejka-sexi/tyaga/one/" + id  + '/' + status);
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

watch((groupedSelected.value)  =()=> {
    formData.value.status = groupedSelected.value;
    getAll();
})

</script>

<style lang="scss" scoped>

.vertical-text {
    writing-mode: vertical-rl; /* Set text direction to vertical */
    transform: rotate(180deg); /* Rotate the text by 180 degrees */
    white-space: nowrap; /* Prevent wrapping */
  }

  .center-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>