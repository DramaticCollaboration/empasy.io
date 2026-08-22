---
title: Low-Code Fullstack API & UI Generator
description: Scaffolds Spring Boot 3 backend code and Ant Design Vue 3 frontend admin screens based on database table metadata.
sort: 4
---

# Low-Code Fullstack API & UI Generator

SyncBoot's code generation module analyzes database table metadata to generate **Spring Boot 3 backend APIs and Ant Design Vue 3 administrative interfaces**.

---

## Generated Artifacts Overview

Selecting a table and executing code generation creates the following components:

```
📁 Generated Artifact Structure
├── Backend (Java / Spring Boot 3)
│   ├── SubscriptionController.java     # REST API Endpoints with OpenAPI annotations
│   ├── SubscriptionService.java        # Business Logic Interface
│   ├── SubscriptionServiceImpl.java    # Transactional Service Implementation
│   ├── SubscriptionMapper.java         # MyBatis-Plus Mapper Interface
│   ├── SubscriptionMapper.xml          # XML Mapper Query File
│   ├── SubscriptionEntity.java         # Database Entity Class
│   └── SubscriptionDTO.java            # Request/Response Payload DTOs
│
└── Frontend (Vue 3 / TypeScript)
    ├── SubscriptionList.vue            # Search filter & table view screen
    ├── SubscriptionModal.vue           # Modal dialog with validation rules
    └── subscription.api.ts             # Axios-based API client module
```

---

## Key Features

1. **Search & Filter Configuration**: Date range pickers, dropdown selects, and keyword search filters configured in the UI map directly to backend query wrappers.
2. **Dual Validation**: Applies consistent validation rules on both frontend (Ant Design Form Rules) and backend (Jakarta Bean Validation).
3. **Excel Processing Template**: Integrates the EasyExcel library for high-volume Excel export and import operations.
4. **OpenAPI 3.0 Integration**: Generated REST APIs include OpenAPI annotations accessible at `/swagger-ui/index.html`.

---

## Sample Backend Controller

```java
@Tag(name = "Subscription Management", description = "Recurring Subscription APIs")
@RestController
@RequestMapping("/api/v1/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Operation(summary = "Paginated Subscription Query")
    @GetMapping
    @PreAuthorize("hasAuthority('subscription:query')")
    public Result<IPage<SubscriptionDTO>> getPage(
            @ParameterObject SubscriptionQueryDTO query,
            @ParameterObject PageParam pageParam) {
        return Result.ok(subscriptionService.queryPage(query, pageParam));
    }

    @Operation(summary = "Create New Subscription")
    @PostMapping
    @PreAuthorize("hasAuthority('subscription:create')")
    public Result<Long> create(@Valid @RequestBody SubscriptionCreateDTO dto) {
        return Result.ok(subscriptionService.createSubscription(dto));
    }
}
```
