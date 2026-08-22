---
title: ローコードフルスタックAPI & UIジェネレーター
description: データベーステーブルメタデータを基にSpring Boot 3バックエンドコードとAnt Design Vue 3管理画面コードを生成します。
sort: 4
---

# ローコードフルスタックAPI & UIジェネレーター

SyncBootのコード生成モジュールは、テーブル構造を解析して**Spring Boot 3バックエンドAPIとAnt Design Vue 3管理画面**ソースコードを生成します。

---

## 生成成果物構成

テーブルを選択してコード生成を実行すると、以下の構成要素が生成されます。

```
📁 生成される成果物構成
├── Backend (Java / Spring Boot 3)
│   ├── SubscriptionController.java     # REST API & OpenAPI定義
│   ├── SubscriptionService.java        # ビジネスロジックインターフェース
│   ├── SubscriptionServiceImpl.java    # トランザクション実装クラス
│   ├── SubscriptionMapper.java         # MyBatis-Plus Mapperインターフェース
│   ├── SubscriptionMapper.xml          # XMLマッパーファイル
│   ├── SubscriptionEntity.java         # テーブルマッピングエンティティ
│   └── SubscriptionDTO.java            # Request/Response DTO
│
└── Frontend (Vue 3 / TypeScript)
    ├── SubscriptionList.vue            # 検索フィルター & テーブル画面
    ├── SubscriptionModal.vue           # 登録・編集モーダル画面
    └── subscription.api.ts             # AxiosベースAPIクライアント
```

---

## 主な機能

1. **検索およびフィルター条件設定**: 日付範囲選択、セレクトボックス、キーワード検索などのフィルターをUI上で設定し、バックエンドクエリと連携します。
2. **二重バリデーション**: フロントエンド（Ant Design Form Rules）とバックエンド（Jakarta Bean Validation）に同一の検証規則を適用します。
3. **Excel処理テンプレート**: EasyExcelライブラリを基盤とした大容量データ入出力コードを提供します。
4. **OpenAPI 3.0連動**: 生成されたAPIはSwagger定義が含まれ、`/swagger-ui/index.html`からテスト可能です。

---

## Controller実装例

```java
@Tag(name = "Subscription Management", description = "定期課金管理API")
@RestController
@RequestMapping("/api/v1/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Operation(summary = "サブスクリプション一覧ページング取得")
    @GetMapping
    @PreAuthorize("hasAuthority('subscription:query')")
    public Result<IPage<SubscriptionDTO>> getPage(
            @ParameterObject SubscriptionQueryDTO query,
            @ParameterObject PageParam pageParam) {
        return Result.ok(subscriptionService.queryPage(query, pageParam));
    }

    @Operation(summary = "新規サブスクリプション登録")
    @PostMapping
    @PreAuthorize("hasAuthority('subscription:create')")
    public Result<Long> create(@Valid @RequestBody SubscriptionCreateDTO dto) {
        return Result.ok(subscriptionService.createSubscription(dto));
    }
}
```
