<template>
  <div class="h-screen t-pt-16 t-pb-12 t-flex t-flex-col t-bg-white">
    <main
      class="t-flex-grow t-flex t-flex-col t-justify-center t-max-w-7xl t-w-full t-mx-auto t-px-4 sm:t-px-6 lg:t-px-8"
    >
      <div class="t-text-center">
        <h1
          class="t-mt-2 t-text-4xl t-font-extrabold t-text-gray-900 t-tracking-tight sm:t-text-5xl"
        >
          {{ message }}
        </h1>
        <p class="t-mt-2 t-text-base t-text-gray-500">
          {{ description }}
        </p>
        <div class="t-mt-6">
          <!--          <a-->
          <!--            @click="$router.push({ name: 'overview' })"-->
          <!--            class="t-text-base t-font-medium t-text-green-600"-->
          <!--          >-->
          <!--            Trang chủ<span aria-hidden="true"> &rarr;</span>-->
          <!--          </a>-->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Empty",
  data() {
    return {
      message: "Lỗi hệ thống",
      description:
        "Chúng tôi chân thành xin lỗi vì sự cố này. Vui lòng liên hệ CSKH để được hỗ trợ.",
    };
  },
  created() {
    // const params = this.$route.params;
    //
    // this.message = params.message || this.message;
    // this.description = params.description || this.description;
  },
};
</script>

<style scoped>
.image-error {
  height: 30rem;
}
</style>
