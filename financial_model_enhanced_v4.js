// تنفيذ المنطق المالي المحسن للنموذج
// يتضمن حساب الإيجار السنوي المقترح وجميع المؤشرات المالية

// دالة لحساب الإيجارات السنوية مع مراعاة فترة السماح والزيادات الإيجارية
function calculateAnnualRents(baseRent, contractDuration, gracePeriod, increaseInterval, increaseRate) {
    const annualRents = [];
    const fullYearsGracePeriod = Math.floor(gracePeriod);
    const partialYearGrace = gracePeriod - fullYearsGracePeriod;
    
    for (let year = 0; year < contractDuration; year++) {
        // حساب عدد الزيادات المطبقة (تبدأ من بداية العقد بغض النظر عن فترة السماح)
        const increaseCount = Math.floor(year / increaseInterval);
        // حساب معامل الزيادة
        const increaseFactor = Math.pow(1 + increaseRate, increaseCount);
        // حساب الإيجار الأساسي مع الزيادات
        const rentWithIncrease = baseRent * increaseFactor;
        
        // تطبيق فترة السماح
        if (year < fullYearsGracePeriod) {
            // فترة سماح كاملة
            annualRents.push(0);
        } else if (year === fullYearsGracePeriod && partialYearGrace > 0) {
            // فترة سماح جزئية (جزء من السنة)
            const partialRent = rentWithIncrease * (1 - partialYearGrace);
            annualRents.push(partialRent);
        } else {
            // بعد فترة السماح
            annualRents.push(rentWithIncrease);
        }
    }
    
    return annualRents;
}

// دالة لحساب صافي القيمة الحالية (NPV)
function calculateNPV(cashFlows, discountRate) {
    let npv = 0;
    for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }
    return npv;
}

// دالة لحساب معدل العائد الداخلي (IRR)
function calculateIRR(cashFlows, initialInvestment) {
    // تنفيذ طريقة نيوتن-رافسون لحساب IRR
    let guess = 0.1; // تخمين أولي
    const maxIterations = 1000;
    const tolerance = 0.0001;
    
    for (let i = 0; i < maxIterations; i++) {
        let npv = -initialInvestment;
        let derivativeNpv = 0;
        
        for (let j = 0; j < cashFlows.length; j++) {
            const factor = Math.pow(1 + guess, j + 1);
            npv += cashFlows[j] / factor;
            derivativeNpv -= (j + 1) * cashFlows[j] / (factor * (1 + guess));
        }
        
        if (Math.abs(npv) < tolerance) {
            return guess;
        }
        
        guess = guess - npv / derivativeNpv;
        
        if (guess <= -1) {
            return 0; // لا يمكن حساب IRR
        }
    }
    
    return guess; // أفضل تقريب بعد الحد الأقصى من التكرارات
}

// دالة لحساب النتائج المالية المحسنة
function calculateEnhancedResults(inputs) {
    // تحويل النسب المئوية من أرقام صحيحة إلى كسور عشرية
    const rentIncreaseRateDecimal = inputs.rentIncreaseRate / 100;
    const capitalizationRateDecimal = inputs.capitalizationRate / 100;
    const buildingRatioDecimal = inputs.buildingRatio / 100;
    const designCostDecimal = inputs.designCost / 100;
    const indirectCostDecimal = inputs.indirectCost / 100;
    const priceRiskCostDecimal = inputs.priceRiskCost / 100;
    const netIncomeRatioDecimal = inputs.netIncomeRatio / 100;
    const incomeRampUpRateDecimal = inputs.incomeRampUpRate / 100;
    
    // حساب مساحات البناء
    const totalBuildingArea = inputs.landArea * inputs.buildingCoefficient;
    const siteWorkArea = inputs.landArea * (1 - buildingRatioDecimal);
    
    // حساب تكاليف البناء
    const totalBuildingCost = totalBuildingArea * inputs.buildingCost;
    const totalSiteWorkCost = siteWorkArea * inputs.siteworkCost;
    const totalBasementCost = inputs.basementArea * inputs.basementCost;
    const constructionCost = totalBuildingCost + totalSiteWorkCost + totalBasementCost;
    
    // حساب التكاليف الإضافية
    const designCost = constructionCost * designCostDecimal;
    const indirectCost = constructionCost * indirectCostDecimal;
    const priceRiskCost = constructionCost * priceRiskCostDecimal;
    
    // إجمالي تكاليف التطوير
    const totalConstructionCost = constructionCost + designCost + indirectCost + priceRiskCost;
    
    // حساب الدخل السنوي وصافي الدخل
    const annualIncomes = [];
    const annualNetIncomes = [];
    const maxAnnualIncome = inputs.totalIncome;
    const maxAnnualNetIncome = maxAnnualIncome * netIncomeRatioDecimal;
    
    for (let year = 0; year < inputs.contractDuration; year++) {
        let incomeRatio = 0;
        
        // تطبيق تأخير بدء الدخل وتدرج الوصول للدخل
        if (year < inputs.incomeStartYear) {
            // لا يوجد دخل خلال فترة التأخير
            incomeRatio = 0;
        } else {
            // حساب نسبة الدخل بعد فترة التأخير مع تطبيق التدرج
            const yearsAfterStart = year - inputs.incomeStartYear;
            const rampUpYears = Math.ceil(1 / incomeRampUpRateDecimal) - 1;
            
            if (rampUpYears <= 0 || yearsAfterStart >= rampUpYears) {
                // وصول كامل للدخل
                incomeRatio = 1;
            } else {
                // تدرج الوصول للدخل
                incomeRatio = Math.min(1, (yearsAfterStart + 1) * incomeRampUpRateDecimal);
            }
        }
        
        const annualIncome = maxAnnualIncome * incomeRatio;
        const annualNetIncome = maxAnnualNetIncome * incomeRatio;
        
        annualIncomes.push(annualIncome);
        annualNetIncomes.push(annualNetIncome);
    }
    
    // حساب إجماليات الدخل
    const totalIncomeOverContract = annualIncomes.reduce((sum, income) => sum + income, 0);
    const totalNetIncomeOverContract = annualNetIncomes.reduce((sum, netIncome) => sum + netIncome, 0);
    const averageAnnualIncome = totalIncomeOverContract / inputs.contractDuration;
    const averageAnnualNetIncome = totalNetIncomeOverContract / inputs.contractDuration;
    
    // حساب صافي القيمة الحالية للتدفقات النقدية بدون إيجار
    const npvWithoutRent = calculateNPV(annualNetIncomes, capitalizationRateDecimal);
    
    // حساب مخصص شراء الأرض
    const landAllocation = npvWithoutRent - totalConstructionCost;
    
    // دالة لحساب صافي القيمة الحالية للتدفقات النقدية مع إيجار محدد
    function calculateNPVForRent(rentValue) {
        const annualRents = calculateAnnualRents(
            rentValue,
            inputs.contractDuration,
            inputs.gracePeriod,
            inputs.rentIncreaseInterval,
            rentIncreaseRateDecimal
        );
        
        const cashFlows = annualNetIncomes.map((netIncome, i) => netIncome - annualRents[i]);
        return calculateNPV(cashFlows, capitalizationRateDecimal);
    }
    
    // البحث عن قيمة الإيجار التي تجعل NPV = 0
    let minRent = 0;
    let maxRent = maxAnnualNetIncome * 2; // تقدير أولي لأعلى قيمة محتملة
    let proposedBidValue = 0;
    const tolerance = 1000; // التسامح في قيمة NPV (بالريال)
    
    // البحث الثنائي للإيجار المناسب
    for (let i = 0; i < 20; i++) { // عدد كافٍ من التكرارات للوصول إلى دقة مقبولة
        proposedBidValue = (minRent + maxRent) / 2;
        const npv = calculateNPVForRent(proposedBidValue);
        
        if (Math.abs(npv) < tolerance) {
            break; // وجدنا القيمة المناسبة
        } else if (npv > 0) {
            minRent = proposedBidValue;
        } else {
            maxRent = proposedBidValue;
        }
    }
    
    // حساب نسبة التأجير من مخصص شراء الأرض
    const rentToLandAllocationRatio = landAllocation > 0 ? proposedBidValue / landAllocation : 0;
    
    // حساب معدل العائد الداخلي (IRR)
    const annualRents = calculateAnnualRents(
        proposedBidValue,
        inputs.contractDuration,
        inputs.gracePeriod,
        inputs.rentIncreaseInterval,
        rentIncreaseRateDecimal
    );
    
    const cashFlows = annualNetIncomes.map((netIncome, i) => netIncome - annualRents[i]);
    const irr = calculateIRR(cashFlows, totalConstructionCost);
    
    // إعداد النتائج
    return {
        // المدخلات الأساسية
        contractDuration: inputs.contractDuration,
        gracePeriod: inputs.gracePeriod,
        rentIncreaseInterval: inputs.rentIncreaseInterval,
        rentIncreaseRate: inputs.rentIncreaseRate,
        capitalizationRate: inputs.capitalizationRate,
        
        // نتائج المساحات
        totalBuildingArea,
        siteWorkArea,
        
        // نتائج التكاليف
        totalBuildingCost,
        totalSiteWorkCost,
        totalBasementCost,
        constructionCost,
        totalConstructionCost,
        
        // نتائج الدخل
        annualIncomes,
        annualNetIncomes,
        totalIncomeOverContract,
        totalNetIncomeOverContract,
        averageAnnualIncome,
        averageAnnualNetIncome,
        
        // النتائج الرئيسية
        landAllocation,
        proposedBidValue,
        rentToLandAllocationRatio,
        irr,
        
        // دالة لحساب NPV لقيمة إيجار محددة
        calculateNPVForRent,
        
        // أقصى قيمة إيجار ممكنة (للمزلاج)
        maxRentValue: maxRent
    };
}
