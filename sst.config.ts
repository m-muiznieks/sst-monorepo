/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "digiworks",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
      providers: { cloudflare: "6.2.0" },
    };
  },
  async run() {
    const test_worker = new sst.cloudflare.Worker("test-worker", {
      handler: "packages/hono/index.ts", // Place this file in your project root
      url: true,
    });
    //const storage = await import("./infra/storage");
    //await import("./infra/api");
    return {
      api: test_worker.url,
    };
  },
});
