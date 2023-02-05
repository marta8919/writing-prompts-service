"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const prompts_module_1 = require("./prompts/prompts.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(prompts_module_1.PromptsModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3300);
}
bootstrap();
//# sourceMappingURL=main.js.map