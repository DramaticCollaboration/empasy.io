---
title: LangChain4j & Model Context Protocol (MCP) 連携
description: LangChain4jフレームワークおよびModel Context Protocol(MCP) HTTP SSEエンドポイントを介したツール提供とシステム連携仕様。
sort: 7
---

# LangChain4j & Model Context Protocol (MCP) 連携

SyncBootは、標準AIフレームワークである**LangChain4j**および**Model Context Protocol (MCP)**インターフェースを内包し、オーケストレーターやクライアントとの連携をサポートします。

---

## MCP 連携アーキテクチャ

SyncBootは、HTTP Server-Sent Events (SSE)ベースでツール（Tools）とリソース（Resources）を提供します。

```mermaid
sequenceDiagram
    autonumber
    participant Client as オーケストレーター / AIクライアント
    participant MCP as SyncBoot MCP Server (/mcp/sse)
    participant Core as SyncBoot Core / DB / Logs

    Client->>MCP: GET /mcp/tools (ツール一覧照会)
    MCP-->>Client: [read_schema, execute_query, fetch_logs, etc.]
    Client->>MCP: POST /mcp/call (Tool: syncboot_fetch_server_logs)
    MCP->>Core: クラスタ内エラーログ収集
    Core-->>MCP: ログデータ返却
    MCP-->>Client: ログペイロード伝達
```

---

## 提供ツール仕様

| ツール名 | 機能説明 | パラメータ | 戻り値 |
| :--- | :--- | :--- | :--- |
| `syncboot_read_schema` | テーブル構造とメタデータを取得 | `tableName` (String) | カラム名、データ型、Null許容、コメント |
| `syncboot_execute_query` | 認可された範囲内でCRUDクエリを実行 | `sql` (String), `params` (Map) | レコード一覧（最大100件） |
| `syncboot_fetch_server_logs`| 直近のエラーログを収集 | `lines` (Int), `level` (ERROR) | スタックトレース |
| `syncboot_get_table_list` | 管理対象のドメインテーブル一覧を取得 | `tenantId` (String) | テーブル名および説明配列 |

---

## Java バックエンドツール実装例 (LangChain4j)

```java
@Component
public class SyncBootMcpTools {

    @Autowired
    private SchemaService schemaService;

    @Autowired
    private LogInspectorService logInspectorService;

    @Tool("指定テーブルのDDLおよびメタデータを取得します。")
    public TableMetaDTO readSchema(
            @P("対象テーブル物理名 (例: TB_ORDER)") String tableName) {
        return schemaService.getTableMetadata(tableName);
    }

    @Tool("障害分析のために直近のサーバーエラーログを取得します。")
    public String fetchServerLogs(
            @P("取得行数 (デフォルト100)") int lines) {
        return logInspectorService.getRecentErrorLogs(lines);
    }
}
```
