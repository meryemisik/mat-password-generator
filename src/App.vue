<template>
  <div class="password-generator">
    <template>
      <div
        v-html="passwordResultSeperated"
        class="password-result-letter"
      ></div>
    </template>
    <div class="password-select-type">
      <a-select
        default-value="random"
        @change="changePasswordType($event)"
      >
        <a-select-option value="random"> Random Password </a-select-option>
        <a-select-option value="memorable">
          Memorable Password
        </a-select-option>
        <a-select-option value="pin"> Pin </a-select-option>
      </a-select>

      <a-button @click="randomPassword()"><a-icon type="sync" class="password-refresh-button" /></a-button>

      <a-button  @click="copyPassword"> Copy Secure Password </a-button>
    </div>
    <div class="password-filter">
      <div class="slidecontainer">
      <div class="range-input">
        <span>Length </span>
        <input
          type="range"
          :min="this.rangeMin"
          :max="this.rangeMax"
          class="slider"
          id="myRange"
          @change="sliderChange()"
          v-model="rangeValue"
        />
        <span id="demo">{{ rangeValue }}</span>

      </div>
      <div class="range-checkbox">
        <a-checkbox
          v-if="this.passwordType == 'random'"
          @change="numberCheckFunction($event)"
        >
          Number
        </a-checkbox>
        <a-checkbox
          v-if="this.passwordType == 'random'"
          @change="symbolCheckFunction($event)"
        >
          Symbol
        </a-checkbox>
        <a-checkbox
          v-if="this.passwordType == 'memorable'"
          @change="capitalizeCheckFunction($event)"
        >
          Capitalize
        </a-checkbox>
      </div>
        <!-- <a-checkbox
          v-if="this.passwordType == 'memorable'"
          @change="fullWordCheckFunction($event)"
          >Full Words
        </a-checkbox> -->
      </div>
    </div>
  </div>
</template>
<script>
import { wordlist } from "./data/words";
export default {
  data: () => ({
    passwordResultSeperated: "",
    passwordResult: "",
    rangeMin: 1,
    rangeMax: 100,
    rangeValue: 4,
    passwordType: "random",
    numberCheck: false,
    symbolCheck: false,
    capitalizeCheck: false,
    fullWordCheck: false,
    chars: "",
    passwordLength: "",
    password: "",
  }),
  mounted() {
    this.sliderChange();
    this.randomPassword();
  },
  methods: {
    copyPassword(){
      const copyText = this.passwordResult;
      const textArea = document.createElement("textarea");
      textArea.textContent = copyText;
      textArea.classList.add("textarea-input");
      document.body.append(textArea);
      textArea.select();
      document.execCommand("copy");
      this.$notification['success']({
        message: "Copy successful",
      });
    },
    capitalizeCheckFunction(e) {
      this.capitalizeCheck = e.target.checked;
      this.randomPassword()
    },
    // fullWordCheckFunction(e) {
    //   this.fullWordCheck = e.target.fullWordCheck;
    //   this.changePasswordType(this.passwordType);
    // },
    numberCheckFunction(e) {
      this.numberCheck = e.target.checked;
     this.randomPassword()
    },
    symbolCheckFunction(e) {
      this.symbolCheck = e.target.checked;
      this.randomPassword()
    },
    changePasswordType(e) {
      this.passwordResult = "";
      this.passwordType = e;
      if (e == "pin") {
        this.rangeMin = 3;
        this.rangeMax = 12;
        this.rangeValue = 6;
      }
      if (e == "random") {
        this.rangeMin = 8;
        this.rangeMax = 100;
        this.rangeValue = 20;
      }
      if (e == "memorable") {
        this.rangeMin = 3;
        this.rangeMax = 15;
        this.rangeValue = 4;
      }
      this.randomPassword();
    },
    randomPassword() {
      this.passwordResultSeperated = "";
      this.chars = "";
      this.passwordLength = this.rangeValue - 1;
      this.password = "";
      if (this.passwordType == "pin") {
        this.chars = "0123456789";
      }
      if (this.passwordType == "random") {
        this.chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (this.numberCheck == true && this.symbolCheck == false) {
          this.chars += "0123456789";
        }
        if (this.symbolCheck == true && this.numberCheck == false) {
          this.chars += /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        }
        if (this.numberCheck == true && this.symbolCheck == true) {
          this.chars += /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?1234567890]+/;
        }
      }
      if (this.passwordType == "memorable") {
        let wordConcat = "";
        for (var i = 0; i <= this.rangeValue - 1; i++) {
          wordConcat += `${
            wordlist[Math.floor(Math.random() * wordlist.length)]
          }-`;
        }
        this.password = wordConcat.slice(0, -1);
        if (this.capitalizeCheck == true) {
          this.password =
            this.password.charAt(0).toUpperCase() + this.password.slice(1);
        }
      }
      for (var i = 0; i <= this.passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * this.chars.length);
        this.password += this.chars.substring(randomNumber, randomNumber + 1);
      }
      this.passwordResult = this.password;

      Object.values(this.password).map((e) => {
        let className = "";
        if (this.isNumber(parseInt(e))) {
          className = "number";
        }
        if(this.isSymbol(e)){
          className = 'symbol'
        }
        this.passwordResultSeperated += `<div class="password-letter ${className} ">${e}</div>`;
      });
    },
    isNumber(n) {
      return typeof n === "number" && isFinite(n);
    },
    isSymbol(_string) {
      let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (spChars.test(_string)) {
        return true;
      } else {
        return false;
      }
    },
    sliderChange() {
      this.randomPassword();
    },
  },
};
</script>
<style lang="scss">
@import "./assets/generatorPassword.scss";
</style>
