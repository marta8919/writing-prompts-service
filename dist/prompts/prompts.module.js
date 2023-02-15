"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptsModule = void 0;
const common_1 = require("@nestjs/common");
const prompts_controller_1 = require("./prompts.controller");
const prompts_services_1 = require("./prompts.services");
const prompts_repository_1 = require("./prompts.repository");
const typeorm_1 = require("@nestjs/typeorm");
const prompts_entity_1 = require("./prompts.entity");
let PromptsModule = class PromptsModule {
};
PromptsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prompts_entity_1.PromptsEntity])],
        controllers: [prompts_controller_1.PromptsController],
        providers: [prompts_services_1.PromptsService, prompts_repository_1.PromptsRepository]
    })
], PromptsModule);
exports.PromptsModule = PromptsModule;
//# sourceMappingURL=prompts.module.js.map