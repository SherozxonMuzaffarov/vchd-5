<template>
    <main>
        <h5>ВУ-53 expense</h5>

        <div class="mt-5">
            <div class="card shadow-sm" style="overflow: auto; white-space: nowrap">
                <div class="card-body">
                <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                    <BThead >
                        <BTr >
                            <BTd colspan="11" >Прихот</BTd>
                        </BTr>
                        <BTr >
                            <BTd rowspan="3" class="vertical-text " >№ По порядку</BTd>
                            <BTd rowspan="3" class="vertical-text" >Дата поступления</BTd>
                            <BTd rowspan="3" >
                                Наименования <br/> завода или пункта, <br/>
                                откуда ноступиса <br/> колесная пара, <br/> или номер вагона, <br/>
                                из-под которого она <br/> выкачена 
                            </BTd>
                            <BTd colspan="8">Характеристика колосной пары</BTd>
                        </BTr>
                        <BTr >
                            <BTd rowspan="2" class="vertical-text">Тип колосной пары</BTd>
                            <BTd rowspan="2">Номер <br/> колосной  пары</BTd>
                            <BTd rowspan="2" class="vertical-text">Дефект</BTd>
                            <BTd colspan="3">Дата и пункт</BTd>
                            <BTd colspan="2" rowspan="3" class="vertical-text">
                                Диаметр по кругу <br/> катания колеса <br/>
                                ( числитель-правос, <br/> знаменатель-левос)
                            </BTd>
                        </BTr>
                        <BTr class="align-middle">
                            <BTd class="vertical-text">Изготовления оси</BTd>
                            <BTd class="vertical-text">Последного <br/> формирования</BTd>
                            <BTd class="vertical-text">
                                Последнего полного <br/> освидетельствование <br/> колесной пары и <br/>
                                монтажа букс для <br/> роликовых  колесных пар
                            </BTd>
                        </BTr>
                    </BThead>
                    <BTbody>
                        <BTr class="align-middle" :key="Data._id">
                            <BTd>{{ Data?.register_number }}</BTd>
                            <BTd>{{ Data?.register_time }}</BTd>
                            <BTd >{{ Data?.vagon?.nomer }}</BTd>
                            <BTd>{{ Data?.type }}</BTd>
                            <BTd>{{ Data?.number }}</BTd>
                            <BTd>{{ Data?.defective}}</BTd>
                            <BTd>{{ Data?.os_year }}</BTd>
                            <BTd>{{ Data?.last_repair }}</BTd>
                            <BTd>{{ Data?.buksa}}</BTd>
                            <BTd>{{ Data?.diameter?.right }}</BTd>
                            <BTd>{{ Data?.diameter?.left }}</BTd>
                        </BTr>
                    </BTbody>
                </BTableSimple>
                </div>
            </div>
        </div>

        <div class="row">

            {{ expenseFormData }}
            <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
                <BThead >
                    <BTr >
                        <BTd  colspan="15">Расхот</BTd>
                        <BTd  colspan="3">Выполненый ремонт</BTd>
                        <BTd  rowspan="4" class="vertical-text ">Дата полного освидетельствование <br/> колесной пары </BTd>
                        <BTd  rowspan="4" class="vertical-text " v-if="!Data?.is_used">Action</BTd>
                    </BTr>
                    <BTr >
                        <BTd rowspan="3" class="vertical-text" >Дата отправка или подкатки <br/> под вагон </BTd>
                        <BTd rowspan="3" >
                            Наименования <br/> завода или пункта, <br/>
                            куда направлена <br/> колесная пара, <br/> или номер вагона, <br/>
                            из-под которого она <br/> подкачена 
                        </BTd>
                        <BTd colspan="13">Размер колесной пары (мм)</BTd>
                        <!--  -->
                        <BTd colspan="2" rowspan="2">Полная <br/>  ревизия <br/>  роликовых <br/> букс</BTd>
                        <BTd rowspan="3" class="vertical-text" >Прочие работы</BTd>

                    </BTr>
                    <BTr >
                        <BTd colspan="2">Диаметр оси</BTd>
                        <BTd colspan="11" >Колеса</BTd>
                    </BTr>
                    <BTr class="align-middle">
                        
                        <BTd class="vertical-text" colspan="2">Посредние</BTd>
                        <BTd class="vertical-text" colspan="2">Толшена обода</BTd>
                        <BTd class="vertical-text" colspan="2">Прокат</BTd>
                        <BTd class="vertical-text" colspan="2">Толшена диска</BTd>
                        <BTd class="vertical-text" colspan="2">Толшена гребня</BTd>
                        <BTd class="vertical-text" colspan="2">Диаметр по <br/> кругу катания</BTd>
                        <BTd class="vertical-text" >Расстояние между <br/> анутре ,,,,,,</BTd>
                        <!--  -->
                        <BTd class="vertical-text" >С обточкойь <br/> поверхности катания</BTd>
                        <BTd class="vertical-text" >Без обточкойь <br/> поверхности катания</BTd>
                    </BTr>
                </BThead>
                <BTbody>
                    <BTr v-if="Data?.is_used"> 
                        <BTd>{{ Data?.expense?.register_time }}</BTd>
                        <BTd>{{ Data?.expense?.used_place }}</BTd>
                        <BTd>{{ Data?.expense?.mediator?.right }}</BTd>
                        <BTd>{{ Data?.expense?.mediator?.left }}</BTd>
                        <BTd>{{ Data?.expense?.obod_thickness?.right }}</BTd>
                        <BTd>{{ Data?.expense?.obod_thickness?.left }}</BTd>
                        <BTd>{{ Data?.expense?.prokat?.right }}</BTd>
                        <BTd>{{ Data?.expense?.prokat?.left }}</BTd>
                        <BTd>{{ Data?.expense?.disk_thickness?.right }}</BTd>
                        <BTd>{{ Data?.expense?.disk_thickness?.left }}</BTd>
                        <BTd>{{ Data?.expense?.grebn_thickness?.right }}</BTd>
                        <BTd>{{ Data?.expense?.grebn_thickness?.left }}</BTd>
                        <BTd>{{ Data?.expense?.diameter_krug?.right }}</BTd>
                        <BTd>{{ Data?.expense?.diameter_krug?.left }}</BTd>
                        <BTd>{{ Data?.expense?.distance }}</BTd>
                        <BTd>{{ Data?.expense?.with_turning }}</BTd>
                        <BTd>{{ Data?.expense?.without_turning }}</BTd>
                        <BTd>{{ Data?.expense?.other_works }}</BTd>
                        <BTd>{{ Data?.expense?.full_examination_date }}</BTd>
                        
                    </BTr>
                    <BTr v-else>
                        <BTd><BFormInput v-model="expenseFormData.register_time" class="m-0"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.used_place" /></BTd>
                        <BTd><BFormInput v-model="expenseFormData.mediator.right" /></BTd>
                        <BTd><BFormInput v-model="expenseFormData.mediator.left"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.obod_thickness.right" /></BTd>
                        <BTd><BFormInput v-model="expenseFormData.obod_thickness.left"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.prokat.right" /></BTd>
                        <BTd><BFormInput v-model="expenseFormData.prokat.left"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.disk_thickness.right" /></BTd>
                        <BTd><BFormInput v-model="expenseFormData.disk_thickness.left"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.grebn_thickness.right" /></BTd>
                        <BTd><BFormInput v-model="expenseFormData.grebn_thickness.left"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.diameter_krug.right" /></BTd>
                        <BTd><BFormInput v-model="expenseFormData.diameter_krug.left"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.distance"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.with_turning"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.without_turning"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.other_works"/></BTd>
                        <BTd><BFormInput v-model="expenseFormData.full_examination_date"/></BTd>
                        <BTd><BButton variant="outline-primary" @click="saveData"><i class="bi bi-floppy"></i></BButton></BTd>
                    </BTr>
                </BTbody>
            </BTableSimple>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
const route = useRoute();

const Data = ref({})
const expenseData = ref({})

const expenseFormData = ref({
    vu53: '',
    vu53_status: '',
    register_time: '',
    used_place: '',
    mediator:  {
        right: '',
        left: ''
    },
    obod_thickness:  {
        right: '',
        left: ''
    },
    prokat:  {
        right: '',
        left: ''
    },
    disk_thickness:  {
        right: '',
        left: ''
    },
    grebn_thickness:  {
        right: '',
        left: ''
    },
    diameter_krug:  {
        right: '',
        left: ''
    },
    distance: '',
    with_turning: '',
    without_turning: '',
    other_works: '',
    full_examination_date: '',
})

const makeExpenseFormDataNull = () => {
    expenseFormData.value.vu53 = null;
    expenseFormData.value.vu53_status = null;
    expenseFormData.value.register_time = null;
    expenseFormData.value.used_place = null;
    expenseFormData.value.mediator.right = null;
    expenseFormData.value.mediator.left = null;
    expenseFormData.value.obod_thickness.right = null;
    expenseFormData.value.obod_thickness.left = null;
    expenseFormData.value.prokat.right = null;
    expenseFormData.value.prokat.left = null;
    expenseFormData.value.disk_thickness.right = null;
    expenseFormData.value.disk_thickness.left = null;
    expenseFormData.value.grebn_thickness.right = null;
    expenseFormData.value.grebn_thickness.left = null;
    expenseFormData.value.diameter_krug.right = null;
    expenseFormData.value.diameter_krug.left = null;
    expenseFormData.value.distance = null;
    expenseFormData.value.with_turning = null;
    expenseFormData.value.without_turning = null;
    expenseFormData.value.other_works = null;
    expenseFormData.value.full_examination_date = null;
};

const getOne = async() => {
    try {
        let res = await axios.get("/api/gildirak-sexi/vu-53/one/" + route.params.id  + '/' + route.params.status);
        if (res.data) {
            Data.value = res.data;
        }
    } catch (error) {
        console.error(error);
    }
}

//create Expense
const saveData = async () => {
  try {
    const confirmed = confirm("Saqlamoqchimisiz?")
    if (confirmed) {
        expenseFormData.value.vu53 = Data.value._id 
        expenseFormData.value.vu53_status = Data.value.status 
        let res = await axios.post("/api/gildirak-sexi/vu-53/expense-create", expenseFormData.value);
        if (res.data) {
            makeExpenseFormDataNull();
            getOne();
        }
    }
    
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
    getOne()
});



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