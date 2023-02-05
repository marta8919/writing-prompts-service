"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const prompts_module_1 = require("./prompts/prompts.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(prompts_module_1.PromptsModule);
    await app.listen(3300);
}
bootstrap();
//# sourceMappingURL=main.js.map