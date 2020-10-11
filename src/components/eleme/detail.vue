<template>
    <div class="detail">
        <div class="head border-1px border-bottom">商品详情</div>
        <div class="content">
            <img :src="img" alt="" class="img">
            <div class="msg">
                <div class="title">{{title}}</div>
                <div class="desc">{{desc}}</div>
            </div>
            <div class="prices">
                <div class="price">&yen;{{price}}</div>
                <div class="count">x{{count}}</div>
            </div>
        </div>
        <div class="pay-price">
            <span class="pay-text">实付款：</span>
            <span class="real-price">{{totalPrice}}</span>
        </div>
        <div class="bot">
            <span class="wuliiu border-1px border">物流单号</span>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator"
@Component 
export default class Detail extends Vue {
    /**
     * prop
     */
    @Prop(String) private img!: string
    @Prop(String) private title!: string
    @Prop(String) private desc!: string
    @Prop(String) private price!: string
    @Prop(String) private count!: string
    @Prop(String) private totalPrice!: string
}
</script>

<style lang="scss" scoped>
.detail {
    background-color: #fff;
    padding: .3rem;
    .head {
        padding-bottom: .15rem;
        font-size: .32rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: .45rem;
        &::after {
            background-color: #DADADA;
        }
    }
    .content {
        margin-top: .3rem;
        display: flex;
        justify-content: space-between;
        font-family: PingFangSC-Regular, PingFang SC;
        .img {
            width: 1.8rem;
            height: 1.8rem;
            border-radius: .1rem;
            margin-right: .2rem;
        }
        .msg {
            // width: 3.5rem;
            margin-right: .2rem;
            .title {
                font-size: .28rem;
                font-weight: 400;
                color: #333333;
                line-height: .4rem;
                margin-bottom: .2rem;
            }
            .desc {
                font-size: .24rem;
                font-weight: 400;
                color: #666666;
                line-height: .33rem;
            }
        }
        .prices {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .price {
                font-size: .32rem;
                font-weight: 400;
                color: #333333;
                line-height: .45rem;
            }
            .count {
                font-size: .24rem;
                font-weight: 400;
                color: #333333;
                line-height: .33rem;
            }
        }
    }
    .pay-price {
        margin-top: .3rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .pay-text {
            font-size: .24rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: .33rem;
        }
        .real-price {
            font-size: .32rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FE293D;
            line-height: .45rem;
        }
    }
    .bot {
        margin-top: .2rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .wuliiu {
            width: 1.7rem;
            height: .6rem;
            font-size: .28rem;
            text-align: center;
            line-height: .6rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            &::after {
                border-radius: .3rem;
                @media screen and (-webkit-min-device-pixel-ratio: 2){
                    border-radius: .6rem;
                }
                @media screen and (-webkit-min-device-pixel-ratio: 3){
                    border-radius: .9rem;
                }
            }
            
        }
    }
}
</style>