<template>
    <main>
        
        <h3>Журнал</h3>
        <h4>Наплавки гребней колёсной пары</h4>
        
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
                            <BTd >№</BTd>
                            <BTd >Дата <br> наплавки <br> колесной <br> пары</BTd>
                            <BTd colspan="2">№ <br> колесной <br> пары и <br> №№ <br> колес</BTd>
                            <BTd >Ф.И.О и <br> подпис <br> бригадира, <br> выдающего <br> кол пару под <br> наплавку</BTd>
                            <BTd >Ф.И.О и подпис <br> сварщика, <br> проводившег <br> наплавку</BTd>
                            <BTd >Ф.И.О и подпис <br> токаря, <br> проводившег <br> наплавку</BTd>
                            <BTd >Ф.И.О и подпис <br> дефектоскописта, <br> проводившего <br> неразрушаюший <br> контролъ</BTd>
                            <BTd >Ф.И.О и подпис <br> приёмшика</BTd>
                        </BTr>
                    </BThead>
                    <BTbody>
                        <BTr v-show="addToggle">
                            <BTd>
                                <BFormSelect v-model="formData.vu53_register_number" :options="vu53s" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--колёсной пары регистер номер--</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd><BFormInput v-model="formData.register_time" /></BTd>
                            <BTd > {{formData.vu53_number }} </BTd>
                            <BTd > 
                                <BFormSelect v-model="formData.vu53_type" :options="vu53Types" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--Тип колёсной пары --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd >
                                <BFormSelect v-model="formData.brigader_name" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--бригадир --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd >
                                <BFormSelect v-model="formData.svarchik_name" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--сварщик --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd >
                                <BFormSelect v-model="formData.tokar_name" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--токаря --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd >
                                <BFormSelect v-model="formData.defektoskopist_name" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--дефектоскописта --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd >
                                <BFormSelect v-model="formData.receptionist_name" :options="employeeList" >
                                    <template #first>
                                    <BFormSelectOption :value="null" disabled>--приёмшика --</BFormSelectOption>
                                    </template>
                                </BFormSelect>
                            </BTd>
                            <BTd ><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                        </BTr>
                        <BTr class="align-middle" v-for="item in Data" :key="item._id">
                            <BTd>{{ item?.vu53_register_number?.register_number }}</BTd>
                            <BTd>{{ item?.register_time }}</BTd>
                            <BTd >{{ item?.vu53_number }}</BTd>
                            <BTd>{{ item?.vu53_type }}</BTd>
                            <BTd>
                                {{ item?.brigader_name?.name }}
                                 <span v-if="item?.is_brigader_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd>
                                {{ item?.svarchik_name?.name }}
                                 <span v-if="item?.is_svarchik_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd>
                                {{ item?.tokar_name?.name }}
                                 <span v-if="item?.is_tokar_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd>
                                {{ item?.defektoskopist_name?.name }}
                                 <span v-if="item?.is_defektoskopist_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd>
                                {{ item?.receptionist_name?.name }}
                                 <span v-if="item?.is_receptionist_sign"><i class="bi bi-check-circle-fill"></i></span>
                                 <span v-else><i class="bi bi-hourglass-split"></i></span>
                            </BTd>
                            <BTd class="d-flex justify-content-center">
                                <button class="btn btn-primary" @click="getOne(item._id, item.vu53_status)">
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
const vu53s = ref([
    {
        text: null,
        value: null,
        number: null,
        status: null,
    }
])

const formData = ref({
    vu53_register_number: '',
    vu53_status: '',
    register_time: '',
    vu53_number: '',
    vu53_type: '',
    brigader_name: '',
    svarchik_name: '',
    tokar_name: '',
    defektoskopist_name: '',
    receptionist_name: ''
})

const groupedOptions = [
  {text: 'ЎТЙ', value: 'ЎТЙ'},
  {text: 'КЗХ', value: 'КЗХ'},
  {text: 'СОБ', value: 'СОБ'},
]

const vu53Types = [
  {text: 'РУ1', value: 'РУ1'},
  {text: 'РУ1Ш', value: 'РУ1Ш'}
]

const groupedSelected = ref()

const addData = () => {
    makeFormNull()
    formData.value.vu53_status = groupedSelected.value
    addToggle.value = !addToggle.value
}

const saveData = async() => {
    try {
        if (formData.value._id) {
            const isConfirmed = confirm("O'zgarishni Saqlamoqchimisiz?");
            if(isConfirmed) {
                let res = await axios.patch("/api/gildirak-sexi/naplavka/update/" + formData.value._id, formData.value);
                if (res.data) {
                    addToggle.value = !addToggle.value
                    makeFormNull();
                    getAll();
                }
            }
        }else {
            const isConfirmed = confirm("Saqlamoqchimisiz");
            if(isConfirmed) {
                let res = await axios.post("/api/gildirak-sexi/naplavka/create", formData.value);
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
    formData.value.vu53_register_number= null,
    formData.value.vu53_status= null,
    formData.value.register_time= null,
    formData.value.vu53_number= null,
    formData.value.vu53_type= null,
    formData.value.brigader_name= null,
    formData.value.svarchik_name= null,
    formData.value.tokar_name= null,
    formData.value.defektoskopist_name= null,
    formData.value.receptionist_name= null
}

// getAllData
const getAll = async() => {
    try {
        let res = await axios.get(`/api/gildirak-sexi/naplavka/all?status=${encodeURIComponent(groupedSelected.value)}`);
        if (res.data) { 
            Data.value = res.data;
        }

    } catch (error) {
        console.error(error);
    }
}

const getOne = async(id, status) => {
    try {
        let res = await axios.get("/api/gildirak-sexi/naplavka/one/" + id  + '/' + status);
        if (res.data) {
            addData()
            formData.value = res.data;
        }
    } catch (error) {
        console.error(error);
    }
}

// allRepairingVagons
const getAllVu53 = async() => {
    try {
    let res = await axios.get(`/api/gildirak-sexi/vu-53/all?status=${encodeURIComponent(groupedSelected.value)}`);
    if (res.data) {
        vu53s.value = res.data.map(function (item) {
            return { text: item.register_number, value: item._id, number: item.number};
        });
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
    formData.value.vu53_status = groupedSelected.value;
    getAll();
    getAllVu53();
    allEmployee();
});

watch(
  [groupedSelected, formData.value],
  async () => {
    formData.value.vu53_status = groupedSelected.value;
    formData.value.vu53_number = vu53s.value.find(item => item.value == formData.value.vu53_register_number)?.number;
    getAll();
    getAllVu53();
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