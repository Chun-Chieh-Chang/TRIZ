import json
import os

def build_master_db():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')

    # Load existing parameters
    with open(os.path.join(data_dir, 'parameters.json'), 'r', encoding='utf-8-sig') as f:
        parameters = json.load(f)

    # Load existing principles
    with open(os.path.join(data_dir, 'principles.json'), 'r', encoding='utf-8-sig') as f:
        principles_raw = json.load(f)

    # Load matrix
    with open(os.path.join(data_dir, 'matrix.json'), 'r', encoding='utf-8-sig') as f:
        matrix = json.load(f)

    # Cross-domain mappings
    cross_domain_map = {
        1: {
            "software": ["微服務架構 (Microservices)", "模組化設計", "資料庫分庫分表 (Sharding)", "Docker 容器化拆分"],
            "business": ["客戶市場細分 (Customer Segmentation)", "敏捷開發 Sprint 拆分", "事業群劃分 (BU)"],
            "engineering": ["組合式家具", "模組化電腦硬體", "可拆卸結構", "粉末燃料提高燃燒表面積"]
        },
        2: {
            "software": ["MVC 視圖與商務邏輯分離", "高負載計算下放非同步佇列", "微服務認證中心分離 (OAuth/JWT)"],
            "business": ["非核心業務外包 (Outsourcing)", "剝離虧損事業部", "自攜設備辦公 (BYOD)"],
            "engineering": ["分離式冷氣將嘈雜壓縮機移至室外", "光纖僅傳導光線不傳導熱量", "警報器只播放狗叫聲"]
        },
        3: {
            "software": ["針對熱點程式碼 (Hotspots) 進行 JIT 編譯與專屬優化", "CDN 邊緣節點就近快取", "VIP 用戶專屬伺服器集群"],
            "business": ["差別定價機制（頭等艙 vs 經濟艙）", "VIP 專屬尊榮客服管道", "重點客戶 (Key Accounts) 專項跟進"],
            "engineering": ["車刀刃部採用超硬鎢鋼而刀柄採用高韌性鋼", "人體工學鍵盤", "鉛筆末端附加橡皮擦"]
        },
        4: {
            "software": ["非對稱加密演算法 (RSA/ECC)", "讀寫分離資料庫架構 (CQRS)", "非對稱主從架構 (Primary-Replica)"],
            "business": ["非對稱競爭戰略（專攻巨頭盲區的利基市場）", "差異化績效激勵機制"],
            "engineering": ["非對稱輪胎胎紋兼顧排水與抓地力", "人體工學滑鼠", "非對稱攪拌葉片防止渦流死角"]
        },
        5: {
            "software": ["API 網關聚合請求 (GraphQL/BFF)", "資料庫批次寫入 (Batch Insert)", "多執行緒平行運算"],
            "business": ["策略聯盟與跨界整合", "一站式超級應用平台 (Super-App)", "供應鏈垂直整合"],
            "engineering": ["多核心處理器晶片", "瑞士軍刀", "雙層/三層中空隔音玻璃", "流水線並行組裝作業"]
        },
        6: {
            "software": ["通用類別與多型 (Polymorphism)", "通用框架與中介軟體", "全功能 CLI 工具集"],
            "business": ["T 型複合人才跨職能協同", "全通路複合功能服務門市 (Omni-channel)"],
            "engineering": ["智慧型手機整合電話、相機、GPS", "沙發床", "汽車座椅骨架兼作防滾架"]
        },
        7: {
            "software": ["封裝 (Encapsulation)", "網路協定封裝 (IP in IP / VPN 隧道)", "虛擬機器內的 Docker 容器 (Nested VM)"],
            "business": ["母子公司控股結構", "分層授權與責任巢狀架構"],
            "engineering": ["伸縮天線", "套筒板手套裝", "伸縮量尺", "內視鏡雙重導管"]
        },
        8: {
            "software": ["負載均衡器將流量分散至閒置節點以減輕單點壓力", "背壓機制 (Backpressure) 防止系統崩潰"],
            "business": ["交叉補貼戰略（以高毛利產品補貼引流產品）", "發行對沖基金降低投資組合風險"],
            "engineering": ["熱氣球浮力艙補償吊艙重量", "飛機機翼空氣動力升力", "水下機器人浮力平衡艙"]
        },
        9: {
            "software": ["軟體交易內存 (STM) 預設樂觀鎖若衝突則自動回滾", "防禦性編程 (Defensive Programming)"],
            "business": ["合約中預設違約金條款", "外匯對沖鎖定匯率風險"],
            "engineering": ["預力混凝土（預先拉伸鋼筋以抵抗受載後的拉應力）", "高壓容器預應力纏繞鋼絲"]
        },
        10: {
            "software": ["資源預載入 (Pre-fetching / Pre-loading)", "靜態頁面預渲染 (SSG / SSR)", "資料庫連接池預熱 (Pool Warm-up)"],
            "business": ["會員預付費機制", "群眾募資預售以鎖定訂單量", "JIT 生產模式中物料預先送達工位"],
            "engineering": ["手術前預先消毒手術器具", "易撕包裝預先打孔切痕", "預先裝配與預製建築構件"]
        },
        11: {
            "software": ["RAID 磁碟陣列備援", "故障轉移 (Failover) 與熔斷機制 (Circuit Breaker)", "藍綠部署與自動回滾"],
            "business": ["購買企業中斷營運險", "關鍵崗位設置雙人互備 (Shadowing) 機制"],
            "engineering": ["汽車安全氣囊", "降落傘備用副傘", "電梯緊急限速防墜煞車夾"]
        },
        12: {
            "software": ["微服務間使用零拷貝 (Zero-Copy) 與共享內存技術避免多次上下文切換與序列化消耗"],
            "business": ["同級橫向直接溝通機制，免去層層向上請示與下達的流程損耗"],
            "engineering": ["運河船閘等高水位過渡系統", "重力輔助輸送帶等高傳送", "懸吊平衡起重機"]
        },
        13: {
            "software": ["依賴反轉原則 (IoC / Dependency Injection)", "反向代理 (Reverse Proxy)", "事件驅動反向通知 (Webhooks)"],
            "business": ["逆向物流（二手回收與翻新再銷售）", "眾籌模式（先取得訂單與資金再開工生產）"],
            "engineering": ["跑步機（人相對不動而地面滾動）", "風洞實驗（固定模型、吹送流體）", "倒置式番茄醬瓶"]
        },
        14: {
            "software": ["平滑曲線圖表渲染演算法", "輪詢架構改為環形緩衝區 (Ring Buffer) 與圓形佇列"],
            "business": ["圓桌開放式辦公與扁平溝通會議", "服務體驗週期循環設計"],
            "engineering": ["圓角結構分散應力集中", "滾珠軸承與滾針導軌", "原子筆滾珠筆尖", "螺旋輸送機"]
        },
        15: {
            "software": ["雲端彈性自動擴展 (Auto-scaling)", "動態路由配置與動態權重調整", "功能開關 (Feature Flags) 即時啟閉"],
            "business": ["浮動定價機制（機票與叫車尖峰動態加價）", "動態敏捷項目小組（隨項目即時成軍與解散）"],
            "engineering": ["汽車主動式電磁懸吊避震系統", "可變後掠翼飛機", "鉸接式雙節低底盤巴士", "折疊多功能椅"]
        },
        16: {
            "software": ["過度配置快取容量以換取極致命中率", "先讀取全量資料再做本機過濾 (Over-fetching with local filtering)"],
            "business": ["餐廳點餐提供略微超量的份量以提升顧客滿意度與口碑", "適度寬鬆的庫存安全水位"],
            "engineering": ["金屬噴漆時稍微過度噴塗再刮除多餘塗層", "浸塗法均勻鍍膜", "電容器過充防衰減設計"]
        },
        17: {
            "software": ["二維平面資料表轉為三維多維度分析 (OLAP Cube)", "單層架構升級為 3D 空間微服務拓撲可視化"],
            "business": ["商業模式從單一產品銷售躍升為「硬體+軟體+服務」三維立體生態矩陣"],
            "engineering": ["多層立體自動化立體倉儲", "多層 3D 立體堆疊晶片 (3D NAND / Chiplet)", "傾斜式卸料攪拌車"]
        },
        18: {
            "software": ["抖動重試演算法 (Exponential Backoff with Jitter) 避免驚群效應 (Thundering Herd)"],
            "business": ["定期發起黑客松 (Hackathon) 激發組織創新活力，打破既有思維僵局"],
            "engineering": ["超音波清洗機與超音波手術刀", "震動夯土機與高頻震動篩分機", "共振破岩鑽頭"]
        },
        19: {
            "software": ["定時任務排程 (Cron Jobs / Polling)", "脈衝式批量同步資料", "心跳檢測 (Heartbeat Mechanism)"],
            "business": ["季末衝刺考核與週期性大促銷節奏 (如雙 11、黑五)", "敏捷固定雙週疊代週期"],
            "engineering": ["脈衝寬度調變 (PWM) 精確控制電機轉速", "ABS 汽車防鎖死煞車脈衝系統", "警示閃爍燈"]
        },
        20: {
            "software": ["雙活資料中心無中斷熱切換", "即時資料流處理 (Kafka / Flink Streaming) 實現資料不落地持續計算"],
            "business": ["24 小時不間斷全球客服日不落輪班體系 (Follow-the-Sun Model)"],
            "engineering": ["雙離合自手排變速箱（換檔無動力中斷）", "印表機往返雙向高速列印", "飛輪儲能連續供電"]
        },
        21: {
            "software": ["短路求值演算法 (Short-circuit Evaluation)", "快取穿透時快速失敗 (Fail-fast) 避免資料庫雪崩"],
            "business": ["初創產品快速 MVP 上市試錯，跳過冗長市場調查階段以規避被競品卡位風險"],
            "engineering": ["高速切削減少切削熱傳導至工件產生形變", "極速穿過高溫/高輻射危險區域", "急速冷凍保鮮技術"]
        },
        22: {
            "software": ["將惡意爬蟲或攻擊流量引入蜜罐系統 (Honeypot) 進行威脅情報萃取與安全模型訓練"],
            "business": ["將客戶的嚴重投訴轉化為產品質量重大升級與忠誠度回饋的品牌公關轉機"],
            "engineering": ["利用工廠工業廢熱進行區域供暖或低溫發電", "疫苗接種（利用滅活病毒激發人體免疫抗體）"]
        },
        23: {
            "software": ["全鏈路 APM 性能監控與即時日誌告警 (Prometheus/Grafana)", "前端 Sentry 錯誤即時自動上報"],
            "business": ["NPS 顧客淨推薦值即時問卷調查", "敏捷開發每週 Sprint 復盤會議 (Retrospective)"],
            "engineering": ["恆溫空調溫度傳感器閉環調節", "自動駕駛毫米波雷達與光達即時反饋閉環控制"]
        },
        24: {
            "software": ["引入中間件 (Middleware) 解耦前後端", "事件匯流排 (Event Bus) 與訊息佇列 (RabbitMQ/Kafka)"],
            "business": ["透過可信賴的第三方託管機構 (Escrow) 降低交易信用風險", "代理商與分銷經銷商網路"],
            "engineering": ["金屬焊接時使用助焊劑", "高溫作業使用耐熱隔熱手套夾取", "真空吸盤中介搬運大面積玻璃"]
        },
        25: {
            "software": ["Kubernetes Pod 故障自癒 (Self-healing)", "資料庫連接自適應重新連接與緩衝重放"],
            "business": ["使用者自助開通帳號與知識庫自助解惑 (Self-service Knowledge Base)", "無人超市自助結帳"],
            "engineering": ["含油多孔自潤滑軸承", "具備微膠囊自我修復能力的混凝土", "利用汽車廢氣驅動渦輪增壓器"]
        },
        26: {
            "software": ["單元測試使用 Mock 物件與虛擬樁 (Stubs)", "在沙盒測試環境 (Sandbox) 模擬真實生產資料"],
            "business": ["標準化 SOP 連鎖加盟模式 (Franchising)", "標竿企業競爭力模型複製與移植"],
            "engineering": ["高擬真飛行模擬器訓練機師", "數位分身 (Digital Twin) 虛擬調試", "光學投影檢驗取代實體治具"]
        },
        27: {
            "software": ["無伺服器架構 (Serverless Functions) 隨用隨銷毀", "短期快照實例 (Spot Instances) 節省 80% 雲成本"],
            "business": ["耗材定價盈利模式（低價出售印表機/膠囊咖啡機，高毛利銷售墨盒/咖啡膠囊）"],
            "engineering": ["一次性無菌醫療注射針筒", "紙杯與拋棄式防護衣", "一次性保險絲"]
        },
        28: {
            "software": ["軟體定義網路 (SDN) 替代實體硬體路由器配置", "光學傳輸 (光纖/光互連) 替代傳統銅線匯流排"],
            "business": ["數位虛擬合約與區塊鏈智慧合約替代繁瑣紙本審批與人工公證"],
            "engineering": ["磁懸浮列車取代傳統輪軌摩擦系統", "感應式無線充電取代實體插孔", "紅外線感應水龍頭"]
        },
        29: {
            "software": ["資料流緩衝區 (Buffer Stream) 柔性吸收突發流量高峰 (流量削峰填谷)"],
            "business": ["流動性資金池與彈性靈活薪酬福利體系 (Flexible Benefits)"],
            "engineering": ["氣動氣墊減震懸吊鞋", "液壓千斤頂與液壓重型挖掘機", "氣動扭矩板手"]
        },
        30: {
            "software": ["API 網關層設置資料過濾薄膜（清洗敏感資料）", "網頁防護安全膜 (WAF / 反爬蟲防護盾)"],
            "business": ["組織部門間建立邊界防火牆協議 (Information Barrier / Chinese Wall)"],
            "engineering": ["充氣膜結構體育場館", "手機防刮保護貼膜", "農業大棚保溫遮陽薄膜"]
        },
        31: {
            "software": ["稀疏矩陣 (Sparse Matrix) 壓縮儲存演算法", "布隆過濾器 (Bloom Filter) 高效過濾海量不存在資料"],
            "business": ["彈性多孔隙的組織結構（允許員工保留 15% 自由時間投入自主創新探索專案）"],
            "engineering": ["蜂窩結構輕量化吸能保險桿", "微孔發泡隔音隔熱材料", "含油多孔合金軸瓦"]
        },
        32: {
            "software": ["語意化語法高亮 (Syntax Highlighting)", "UI 根據告警嚴重等級自動切換紅黃綠狀態顏色與透明度"],
            "business": ["品牌識別色彩系統與視覺 VI", "敏捷看板利用不同顏色標籤區分任務優先順序 (Kanban Cards)"],
            "engineering": ["光致變色太陽眼鏡", "熱敏變色防燙水杯標示", "電控液晶調光隱私玻璃"]
        },
        33: {
            "software": ["微服務全端統一採用 TypeScript/Node.js 生態以實現前後端代碼與型別庫高度同質複用"],
            "business": ["統一企業內部文化價值觀與溝通語言，大幅降低跨部門協同認知摩擦"],
            "engineering": ["同種金屬材料銲接以徹底消除電偶腐蝕與熱膨脹差", "金剛石刀具高速切削金剛石工件"]
        },
        34: {
            "software": ["自動記憶體垃圾回收機制 (Garbage Collection)", "任務完成後自動銷毀臨時容器與快照磁碟"],
            "business": ["專利生命週期管理（主動放棄無商業價值專利以節省年費，集中資源於核心專利）"],
            "engineering": ["多節多級火箭發射後逐級脫離減重", "人體可吸收生物降解手術縫合線", "砂輪自銳性磨損暴露新磨刃"]
        },
        35: {
            "software": ["動態調整 JVM 堆內存大小與 GC 策略", "資料傳輸動態根據網路頻寬切換 GZIP/Brotli 壓縮等級"],
            "business": ["傳統買斷制轉型為訂閱制 SaaS 模式 (改變收入現金流物理形態)", "彈性工時與遠距混合辦公"],
            "engineering": ["液態氮超低溫急速冷凍生物樣本", "超臨界流體二氧化碳精油萃取", "熱熔膠加熱軟化冷卻固化"]
        },
        36: {
            "software": ["將冷資料從高成本高速記憶體動態沉澱轉移至低成本冷物件儲存 (S3 Glacier)"],
            "business": ["企業在經濟週期低谷期將重資產商業模式動態轉為輕資產平台加盟模式"],
            "engineering": ["熱導管利用相變工質蒸發與冷凝超高導熱散熱", "相變蓄熱調溫服裝材料", "乾冰昇華冷卻不留殘渣"]
        },
        37: {
            "software": ["動態頻寬彈性伸縮與執行緒池根據負載高峰自動擴張/收縮"],
            "business": ["彈性薪酬體系（業績暴增時獎金倍增，淡季時保障底薪以維持組織韌性）"],
            "engineering": ["雙金屬片熱膨脹係數差製作機械式溫控開關", "熱縮套管加熱後緊密包覆線纜接頭", "熱套裝配工藝"]
        },
        38: {
            "software": ["在壓測階段注入超高壓流量 (Chaos Engineering / 混沌工程) 快速暴露潛在架構脆弱點"],
            "business": ["實施高激勵戰狼激勵機制或組織良性內部賽馬競爭以激發團隊極限潛能"],
            "engineering": ["臭氧強氧化高效水質殺菌消毒", "純氧助燃超高溫熔煉爐", "高壓氧艙促進術後組織快速癒合"]
        },
        39: {
            "software": ["將核心資料庫部署於完全隔離的無外網私有 VPC 子網與專用硬體隔絕環境"],
            "business": ["在核心新產品研發階段簽署嚴格保密協議 (NDA) 並在封閉隔離專案室秘密研發"],
            "engineering": ["氬氣保護電弧銲接防止高溫金屬氧化", "高純度氮氣充填食品包裝延長保鮮", "真空半導體晶圓鍍膜腔體"]
        },
        40: {
            "software": ["混成雲架構 (Hybrid Cloud / Multi-cloud)", "多語言微服務架構 (Polyglot Microservices) 發揮各語言極致長處"],
            "business": ["多元化業務組合 (Portfolio) 分散單一市場系統性風險", "跨界產學研創新聯盟"],
            "engineering": ["碳纖維增強樹脂複合材料 (CFRP)", "鋼筋混凝土", "金屬基陶瓷複合防彈裝甲板"]
        }
    }

    # Enhance principles
    master_principles = []
    for p in principles_raw:
        pid = p["id"]
        domains = cross_domain_map.get(pid, {
            "engineering": p.get("examples", []),
            "software": ["模組化與架構解耦", "靈活配置與抽象化"],
            "business": ["流程優化與資源配置", "價值鏈協同"]
        })
        
        # Extract Chinese and English name
        name_full = p["name"]
        name_en = name_full.split('(')[0].strip() if '(' in name_full else name_full
        name_zh = name_full.split('(')[1].replace(')', '').strip() if '(' in name_full else name_full

        master_principles.append({
            "id": pid,
            "name": name_full,
            "name_en": name_en,
            "name_zh": name_zh,
            "description": p.get("description", ""),
            "examples_engineering": domains["engineering"],
            "examples_software": domains["software"],
            "examples_business": domains["business"]
        })

    # Separation principles for Physical Contradiction
    separation_principles = [
        {
            "id": 1,
            "code": "space",
            "name_zh": "空間分離 (Separation in Space)",
            "name_en": "Separation in Space",
            "core_idea": "如果互斥的特性要求可以在不同空間區域分別實現，則將空間劃分為各自滿足 P 與 非 P 的區域。",
            "guiding_question": "在空間的每一個點上都必須具備該屬性嗎？能否在位置 A 具備 P，在位置 B 具備 非 P？",
            "recommended_principles": [1, 2, 3, 4, 7, 17, 24, 30],
            "examples": [
                "雙焦/多焦點眼鏡：鏡片上半部看遠（平光/近視），下半部看近（老花）。",
                "空心飛機鉚釘：外表面實心以承受剪力，內部空心減輕自重。",
                "雙層保溫瓶：內外壁維持結構剛性，中間真空層阻斷熱傳導。",
                "軟體架構：將高頻讀取（記憶體快取空間）與持久化寫入（磁碟空間）在儲存空間維度分離。"
            ]
        },
        {
            "id": 2,
            "code": "time",
            "name_zh": "時間分離 (Separation in Time)",
            "name_en": "Separation in Time",
            "core_idea": "如果互斥的要求出現在不同時間段，則在時間 T1 具備狀態 P，在時間 T2 具備狀態 非 P。",
            "guiding_question": "在整個生命週期或運行週期的每一秒都必須具備該屬性嗎？能否在階段 A 是 P，在階段 B 變成 非 P？",
            "recommended_principles": [9, 10, 15, 16, 19, 20, 21, 34],
            "examples": [
                "飛機起落架：起降時放下起落架支撐（狀態 P）；飛行巡航時收起減少風阻（狀態 非 P）。",
                "交通號誌燈：同一路口在時間 A 允許通行（綠燈），在時間 B 禁止通行（紅燈）。",
                "打樁機重錘：提升時處於自由狀態；下落瞬間產生巨大重力衝擊。",
                "軟體架構：平日以低資源維持連線，尖峰時刻啟動 Auto-scaling 擴容節點。"
            ]
        },
        {
            "id": 3,
            "code": "condition",
            "name_zh": "條件分離 / 狀態分離 (Separation upon Condition)",
            "name_en": "Separation upon Condition",
            "core_idea": "根據不同的外部刺激或環境條件（溫度、壓力、電場、酸鹼度、化學狀態），系統自動在 P 與 非 P 之間智能切換。",
            "guiding_question": "在所有環境條件下都必須具備相同的屬性嗎？能否依賴溫度、受力、負載等條件動態觸發屬性轉變？",
            "recommended_principles": [32, 35, 36, 37, 38, 39],
            "examples": [
                "光致變色眼鏡：室內紫外線弱時透明；室外強光下自動轉變為深色墨鏡。",
                "非牛頓流體防彈衣 (D3O)：平時柔軟舒適便於運動；遭遇高速衝擊時瞬間變硬分散能量。",
                "熱敏保險絲：正常溫度下為導電體；超過額定高溫時熔斷變為絕緣體。",
                "軟體架構：流量低時執行即時同步寫入；當負載超過臨界閥值時自動降級切換為非同步批次排程。"
            ]
        },
        {
            "id": 4,
            "code": "scale",
            "name_zh": "系統層級分離 / 整體與部分分離 (Separation between System and Subsystem)",
            "name_en": "Separation between System & Subsystem",
            "core_idea": "在微觀層級（子系統/零件）具備屬性 P，但在宏觀層級（超系統/整體）呈現相反的屬性 非 P（或反之）。",
            "guiding_question": "每一個獨立零件都必須和系統整體具備完全相同的物理屬性嗎？能否微觀具備特性 P，宏觀組合成 非 P？",
            "recommended_principles": [1, 5, 6, 7, 8, 13, 26, 31, 33, 40],
            "examples": [
                "自行車鏈條：單個鏈節是完全剛硬的鋼件（保證抗拉強度）；但數十個剛硬鏈節組裝成的整體卻具備極高的柔順彎曲性。",
                "百葉窗：單個葉片完全不透光，但整體排列角度可自由調節整體透光量。",
                "盲人點字圖書：微觀凸點提供觸覺辨識，宏觀紙張整體保持平整裝訂。",
                "軟體架構：每個微服務皆為無狀態 (Stateless)，但超系統集群整體維持分散式會話狀態 (Stateful)。"
            ]
        }
    ]

    # Technological Evolution Laws
    evolution_laws = [
        {
            "id": 1,
            "name_zh": "1. 系統完備性法則",
            "name_en": "Law of Completeness of Parts",
            "description": "任何獨立運作的技術系統必須包含動力裝置、傳動裝置、執行裝置與控制裝置四大要素。進化趨勢是人逐步從各裝置中退出（動力電氣化 → 傳動自動化 → 執行機器人化 → 控制 AI 化）。"
        },
        {
            "id": 2,
            "name_zh": "2. 能量傳遞法則",
            "name_en": "Law of Energy Conductivity",
            "description": "能量必須能從動力源高效無阻礙地傳遞至執行工具。進化趨勢：機械傳遞 → 液壓/氣壓 → 電氣傳遞 → 電磁場/光波無接觸傳導。"
        },
        {
            "id": 3,
            "name_zh": "3. 節奏協調性法則",
            "name_en": "Law of Harmonization of Rhythms",
            "description": "系統各部件的工作頻率、振動形態與節奏必須協調。進化趨勢：靜態剛性運作 → 週期性脈衝 → 自適應共振。"
        },
        {
            "id": 4,
            "name_zh": "4. 提高理想度法則",
            "name_en": "Law of Increasing Ideality",
            "description": "系統始終朝著「功能更多、體積更小、重量更輕、耗能更低、成本趨近於零」的極致推進（Ideality = Benefits / (Costs + Harms)）。終極理想解 (IFR) 是實體系統消失，但功能完全保留。"
        },
        {
            "id": 5,
            "name_zh": "5. 子系統不均衡進化法則",
            "name_en": "Law of Uneven Development of Subsystems",
            "description": "內部各子系統發展速度不同，發展最慢的子系統將成為整個系統的瓶頸，識別與突破瓶頸子系統是發明創新的關鍵點。"
        },
        {
            "id": 6,
            "name_zh": "6. 向超系統進化法則",
            "name_en": "Law of Transition to Super-system",
            "description": "當單一系統的 S 曲線到達極限時，會與其他同類或異類系統組合成超系統（如單機電腦 → 區域網路 → 雲端分散式算力網）。"
        },
        {
            "id": 7,
            "name_zh": "7. 向微觀層次進化法則",
            "name_en": "Law of Transition to Micro-level",
            "description": "執行工具作用尺度從宏觀機械部件向分子、原子、電子及場的微觀層次演進（機械切削 → 化學腐蝕 → 奈米光刻 → 離子束）。"
        },
        {
            "id": 8,
            "name_zh": "8. 動態化與可控性增強法則",
            "name_en": "Law of Increasing Dynamism and Controllability",
            "description": "結構從剛性、固定不變，向柔性、多關節、液體/氣體、電磁場、自適應智慧結構演化。"
        }
    ]

    # ARIZ-85C Key Stages
    ariz_stages = [
        {
            "stage": 1,
            "title": "階段一：問題形式化與模型建構 (Problem Modeling)",
            "steps": [
                "1.1 選擇迷你問題 (Mini-problem) 並界定系統邊界",
                "1.2 定義操作區域 (Operating Zone, OZ) 與操作時間 (Operating Time, OT)",
                "1.3 盤點物質-場資源 (Substance-Field Resources, SFR)"
            ]
        },
        {
            "stage": 2,
            "title": "階段二：衝突尖銳化與極限分析 (Sharpening the Conflict)",
            "steps": [
                "2.1 將技術矛盾尖銳化至極限狀態（如：速度無限大 vs 重量無限大）",
                "2.2 構建最終理想解 (Ideal Final Result, IFR-1) 模型",
                "2.3 提煉出核心物理矛盾 (Physical Contradiction)"
            ]
        },
        {
            "stage": 3,
            "title": "階段三：物理矛盾分離與物-場變革 (Resolution by Separation & Su-Field)",
            "steps": [
                "3.1 嘗試空間分離、時間分離、條件分離與系統層次分離",
                "3.2 引入外部物-場資源（重力場、磁場、熱場、化學相變）",
                "3.3 參照 76 種標準解與 40 條發明原理實例化具體方案"
            ]
        },
        {
            "stage": 4,
            "title": "階段四：方案確效與理想度評估 (Validation & Synthesis)",
            "steps": [
                "4.1 檢驗方案是否引入了次生有害效應",
                "4.2 計算最終理想度提升幅度 (Ideality = Useful / (Harmful + Cost))",
                "4.3 進行專利防禦評估與周邊專利包夾布局"
            ]
        }
    ]

    master_db = {
        "metadata": {
            "version": "2.0.0",
            "title": "TRIZ Master Knowledge Database",
            "updated": "2026-08-14"
        },
        "parameters": parameters,
        "principles": master_principles,
        "separation_principles": separation_principles,
        "evolution_laws": evolution_laws,
        "ariz_stages": ariz_stages,
        "matrix": matrix
    }

    output_path = os.path.join(data_dir, 'triz_master_db.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(master_db, f, ensure_ascii=False, indent=2)

    print(f"Master Database successfully generated at: {output_path}")
    print(f"Total Parameters: {len(parameters)}")
    print(f"Total Principles: {len(master_principles)}")
    print(f"Total Separation Principles: {len(separation_principles)}")
    print(f"Total Matrix Mappings: {len(matrix)}")

if __name__ == '__main__':
    build_master_db()
