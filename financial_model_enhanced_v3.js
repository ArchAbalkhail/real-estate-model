// تنفيذ المنطق المالي المحسن للنموذج
// تحويل الأرقام إلى الصيغة العربية
function toArabicNumerals(num) {
    if (num === undefined || num === null) return '';
    
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).replace(/[0-9]/g, function(w) {
        return arabicNumerals[+w];
    });
}

// تنسيق الأرقام مع فواصل الآلاف والأرقام العربية
function formatNumber(number, useArabicNumerals = true, isPercent = false) {
    if (number === undefined || number === null) return '';
    
    // تحويل النص إلى رقم إذا لزم الأمر
    if (typeof number === 'string') {
        number = parseFloat(number);
    }
    
    // تنسيق الرقم مع فواصل الآلاف
    let formatted;
    if (isPercent) {
        formatted = number.toFixed(2);
    } else if (Math.abs(number) >= 1000000) {
        formatted = number.toLocaleString('en-US', { maximumFractionDigits: 0 }); // بدون كسور عشرية للأرقام الكبيرة
    } else if (Math.abs(number) >= 1) {
        formatted = number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    } else {
        formatted = number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 4 });
    }
    
    // إزالة الأصفار الزائدة بعد الفاصلة العشرية
    formatted = formatted.replace(/\.0+$/, '');
    
    // تحويل إلى أرقام عربية إذا طلب ذلك
    if (useArabicNumerals) {
        return toArabicNumerals(formatted);
    }
    
    return formatted;
}

// حساب المساحات
function calculateAreas() {
    // الحصول على قيم المدخلات
    const landArea = parseFloat(document.getElementById('landArea').value) || 0;
    const buildingCoefficient = parseFloat(document.getElementById('buildingCoefficient').value) || 0;
    const buildingRatio = parseFloat(document.getElementById('buildingRatio').value) || 0;
    const basementArea = parseFloat(document.getElementById('basementArea').value) || 0;
    
    // حساب إجمالي مسطحات البناء
    const totalBuildingArea = landArea * buildingCoefficient;
    document.getElementById('totalBuildingArea').value = totalBuildingArea.toFixed(2);
    
    // حساب مساحة أعمال الموقع العام
    const siteWorkArea = landArea * (buildingRatio / 100);
    document.getElementById('siteWorkArea').value = siteWorkArea.toFixed(2);
}

// حساب التكاليف
function calculateCosts() {
    // الحصول على قيم المدخلات
    const totalBuildingArea = parseFloat(document.getElementById('totalBuildingArea').value) || 0;
    const siteWorkArea = parseFloat(document.getElementById('siteWorkArea').value) || 0;
    const basementArea = parseFloat(document.getElementById('basementArea').value) || 0;
    const buildingCost = parseFloat(document.getElementById('buildingCost').value) || 0;
    const siteworkCost = parseFloat(document.getElementById('siteworkCost').value) || 0;
    const basementCost = parseFloat(document.getElementById('basementCost').value) || 0;
    const designCost = parseFloat(document.getElementById('designCost').value) || 0;
    const indirectCost = parseFloat(document.getElementById('indirectCost').value) || 0;
    const priceRiskCost = parseFloat(document.getElementById('priceRiskCost').value) || 0;
    
    // حساب تكلفة البناء الإجمالية
    const totalBuildingCost = totalBuildingArea * buildingCost;
    document.getElementById('totalBuildingCost').value = totalBuildingCost.toFixed(2);
    
    // حساب تكلفة أعمال الموقع العام الإجمالية
    const totalSiteWorkCost = siteWorkArea * siteworkCost;
    document.getElementById('totalSiteWorkCost').value = totalSiteWorkCost.toFixed(2);
    
    // حساب تكلفة القبو الإجمالية
    const totalBasementCost = basementArea * basementCost;
    document.getElementById('totalBasementCost').value = totalBasementCost.toFixed(2);
    
    // حساب إجمالي تكلفة الإنشاءات
    const constructionCost = totalBuildingCost + totalSiteWorkCost + totalBasementCost;
    document.getElementById('constructionCost').value = constructionCost.toFixed(2);
    
    // حساب تكاليف التصميم والإشراف الهندسي
    const totalDesignCost = constructionCost * (designCost / 100);
    document.getElementById('totalDesignCost').value = totalDesignCost.toFixed(2);
    
    // حساب التكاليف غير المباشرة
    const totalIndirectCost = constructionCost * (indirectCost / 100);
    document.getElementById('totalIndirectCost').value = totalIndirectCost.toFixed(2);
    
    // حساب تكاليف مخاطر ارتفاع الأسعار
    const totalPriceRiskCost = constructionCost * (priceRiskCost / 100);
    document.getElementById('totalPriceRiskCost').value = totalPriceRiskCost.toFixed(2);
}

// حساب الدخل
function calculateIncome() {
    // الحصول على قيم المدخلات
    const totalIncome = parseFloat(document.getElementById('totalIncome').value) || 0;
    const netIncomeRatio = parseFloat(document.getElementById('netIncomeRatio').value) || 0;
    
    // حساب متوسط صافي الدخل السنوي
    const averageAnnualNetIncome = totalIncome * (netIncomeRatio / 100);
    document.getElementById('averageAnnualNetIncome').value = averageAnnualNetIncome.toFixed(2);
}

// حساب النتائج
function calculateResults() {
    try {
        // الحصول على قيم المدخلات
        const contractDuration = parseFloat(document.getElementById('contractDuration').value) || 0;
        const gracePeriod = parseFloat(document.getElementById('gracePeriod').value) || 0;
        const rentIncreaseInterval = parseFloat(document.getElementById('rentIncreaseInterval').value) || 0;
        const rentIncreaseRate = parseFloat(document.getElementById('rentIncreaseRate').value) || 0;
        const capitalizationRate = parseFloat(document.getElementById('capitalizationRate').value) || 0;
        const discountRate = parseFloat(document.getElementById('discountRate').value) || 0;
        
        const totalBuildingCost = parseFloat(document.getElementById('totalBuildingCost').value) || 0;
        const totalSiteWorkCost = parseFloat(document.getElementById('totalSiteWorkCost').value) || 0;
        const totalBasementCost = parseFloat(document.getElementById('totalBasementCost').value) || 0;
        const totalDesignCost = parseFloat(document.getElementById('totalDesignCost').value) || 0;
        const totalIndirectCost = parseFloat(document.getElementById('totalIndirectCost').value) || 0;
        const totalPriceRiskCost = parseFloat(document.getElementById('totalPriceRiskCost').value) || 0;
        
        const totalIncome = parseFloat(document.getElementById('totalIncome').value) || 0;
        const netIncomeRatio = parseFloat(document.getElementById('netIncomeRatio').value) || 0;
        const incomeStartYear = parseFloat(document.getElementById('incomeStartYear').value) || 0;
        const incomeRampUpRate = parseFloat(document.getElementById('incomeRampUpRate').value) || 0;
        
        // حساب إجمالي تكاليف التطوير
        const totalConstructionCost = totalBuildingCost + totalSiteWorkCost + totalBasementCost + 
                                     totalDesignCost + totalIndirectCost + totalPriceRiskCost;
        
        // حساب متوسط صافي الدخل السنوي
        const averageAnnualNetIncome = totalIncome * (netIncomeRatio / 100);
        
        // حساب صافي القيمة الحالية للتدفقات النقدية
        let npv = 0;
        let annualRents = [];
        let annualIncomes = [];
        let annualNetIncomes = [];
        
        for (let year = 1; year <= contractDuration; year++) {
            // حساب الإيجار السنوي مع مراعاة فترة السماح والزيادات
            let annualRent = 0;
            
            // تحديد الإيجار الأساسي (سيتم تحديده لاحقاً)
            const baseRent = 1000000; // قيمة مبدئية، سيتم تحديثها لاحقاً
            
            // حساب عدد الزيادات المطبقة
            const increaseCount = Math.floor((year - 1) / rentIncreaseInterval);
            
            // حساب معامل الزيادة
            const increaseFactor = Math.pow(1 + (rentIncreaseRate / 100), increaseCount);
            
            // تطبيق فترة السماح
            if (year <= gracePeriod) {
                // خلال فترة السماح، الإيجار صفر
                annualRent = 0;
            } else if (year > gracePeriod && year <= Math.ceil(gracePeriod)) {
                // للسنة التي تحتوي على جزء من فترة السماح
                const remainingYear = Math.ceil(gracePeriod) - gracePeriod;
                annualRent = baseRent * increaseFactor * remainingYear;
            } else {
                // بعد فترة السماح، تطبيق الإيجار الكامل مع الزيادات
                annualRent = baseRent * increaseFactor;
            }
            
            // حساب الدخل السنوي مع مراعاة فترة بدء الدخل والتدرج
            let annualIncome = 0;
            let annualNetIncome = 0;
            
            if (year <= incomeStartYear) {
                // قبل بدء الدخل، الدخل صفر
                annualIncome = 0;
                annualNetIncome = 0;
            } else {
                // حساب نسبة الدخل المتحقق بناءً على التدرج
                const yearsSinceStart = year - incomeStartYear;
                const incomeRatio = Math.min(1, yearsSinceStart * (incomeRampUpRate / 100));
                
                // حساب الدخل السنوي وصافي الدخل
                annualIncome = totalIncome * incomeRatio;
                annualNetIncome = annualIncome * (netIncomeRatio / 100);
            }
            
            // حساب التدفق النقدي للسنة
            const cashFlow = annualNetIncome - annualRent - (year === 1 ? totalConstructionCost : 0);
            
            // حساب القيمة الحالية للتدفق النقدي
            const presentValue = cashFlow / Math.pow(1 + (discountRate / 100), year - 1);
            
            // إضافة القيمة الحالية إلى صافي القيمة الحالية
            npv += presentValue;
            
            // تخزين قيم الإيجار والدخل لكل سنة
            annualRents.push(annualRent);
            annualIncomes.push(annualIncome);
            annualNetIncomes.push(annualNetIncome);
        }
        
        // حساب مخصص شراء الأرض
        const landAllocation = npv - totalConstructionCost;
        
        // حساب الإيجار السنوي المقترح
        const annualRent = landAllocation * (capitalizationRate / 100);
        
        // تحديث قيم الإيجار السنوي في المصفوفة
        const updatedAnnualRents = [];
        let totalContractValue = 0;
        let totalIncomeOverContract = 0;
        let totalNetIncomeOverContract = 0;
        
        for (let year = 1; year <= contractDuration; year++) {
            // حساب عدد الزيادات المطبقة
            const increaseCount = Math.floor((year - 1) / rentIncreaseInterval);
            
            // حساب معامل الزيادة
            const increaseFactor = Math.pow(1 + (rentIncreaseRate / 100), increaseCount);
            
            // تطبيق فترة السماح
            let yearlyRent = 0;
            if (year <= gracePeriod) {
                // خلال فترة السماح، الإيجار صفر
                yearlyRent = 0;
            } else if (year > gracePeriod && year <= Math.ceil(gracePeriod)) {
                // للسنة التي تحتوي على جزء من فترة السماح
                const remainingYear = Math.ceil(gracePeriod) - gracePeriod;
                yearlyRent = annualRent * increaseFactor * remainingYear;
            } else {
                // بعد فترة السماح، تطبيق الإيجار الكامل مع الزيادات
                yearlyRent = annualRent * increaseFactor;
            }
            
            updatedAnnualRents.push(yearlyRent);
            totalContractValue += yearlyRent;
            totalIncomeOverContract += annualIncomes[year - 1];
            totalNetIncomeOverContract += annualNetIncomes[year - 1];
        }
        
        // حساب نسبة التأجير من مخصص شراء الأرض
        const rentToLandAllocationRatio = (annualRent / landAllocation) * 100;
        
        // حساب معدل العائد الداخلي
        const irr = (averageAnnualNetIncome / (totalConstructionCost + landAllocation)) * 100;
        
        // تخزين النتائج للاستخدام في وظائف أخرى
        window.currentResults = {
            annualRent,
            totalContractValue,
            landAllocation,
            rentToLandAllocationRatio,
            npv,
            irr,
            totalConstructionCost,
            annualRents: updatedAnnualRents,
            annualIncomes,
            annualNetIncomes,
            totalIncomeOverContract,
            totalNetIncomeOverContract,
            contractDuration,
            gracePeriod,
            rentIncreaseInterval,
            rentIncreaseRate,
            capitalizationRate,
            discountRate,
            landArea: parseFloat(document.getElementById('landArea').value) || 0,
            buildingCoefficient,
            buildingRatio,
            basementArea,
            totalBuildingArea,
            siteWorkArea,
            buildingCost,
            siteworkCost,
            basementCost,
            designCost,
            indirectCost,
            priceRiskCost,
            totalBuildingCost,
            totalSiteWorkCost,
            totalBasementCost,
            totalDesignCost,
            totalIndirectCost,
            totalPriceRiskCost,
            totalIncome,
            netIncomeRatio,
            incomeStartYear,
            incomeRampUpRate,
            averageAnnualNetIncome
        };
        
        // عرض النتائج
        updateResults(window.currentResults);
        
        // إظهار قسم النتائج
        document.getElementById('resultsSection').style.display = 'block';
        
        // التمرير إلى قسم النتائج
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
        
        return window.currentResults;
    } catch (error) {
        console.error('Error in calculateResults:', error);
        alert('حدث خطأ أثناء الحساب. يرجى التحقق من المدخلات والمحاولة مرة أخرى.');
        return null;
    }
}

// تحديث النتائج في واجهة المستخدم
function updateResults(results) {
    if (!results) return;
    
    // تحديد اللغة الحالية
    const currentLang = document.documentElement.lang || 'ar';
    const useArabicNumerals = (currentLang === 'ar');
    
    // تحديث قيم النتائج الرئيسية
    document.getElementById('annualRentResult').textContent = formatNumber(results.annualRent, useArabicNumerals);
    document.getElementById('totalContractValueResult').textContent = formatNumber(results.totalContractValue, useArabicNumerals);
    document.getElementById('landAllocationResult').textContent = formatNumber(results.landAllocation, useArabicNumerals);
    document.getElementById('rentToLandAllocationRatioResult').textContent = formatNumber(results.rentToLandAllocationRatio, useArabicNumerals);
    document.getElementById('npvResult').textContent = formatNumber(results.npv, useArabicNumerals);
    document.getElementById('irrResult').textContent = formatNumber(results.irr, useArabicNumerals);
    document.getElementById('totalConstructionCostResult').textContent = formatNumber(results.totalConstructionCost, useArabicNumerals);
    document.getElementById('totalIncomeOverContractResult').textContent = formatNumber(results.totalIncomeOverContract, useArabicNumerals);
    document.getElementById('totalNetIncomeOverContractResult').textContent = formatNumber(results.totalNetIncomeOverContract, useArabicNumerals);
    
    // تحديث مزلاج الإيجار السنوي
    const rentSlider = document.getElementById('rentSlider');
    const rentSliderValue = document.getElementById('rentSliderValue');
    const npvForRentValue = document.getElementById('npvForRentValue');
    
    // تعيين قيمة المزلاج
    rentSlider.min = 0;
    rentSlider.max = results.annualRent * 2;
    rentSlider.value = results.annualRent;
    rentSliderValue.value = results.annualRent;
    
    // تحديث قيمة NPV للإيجار الحالي
    npvForRentValue.textContent = formatNumber(results.npv, useArabicNumerals);
    
    // إنشاء جدول الإيجارات السنوية
    const tableBody = document.getElementById('annualRentsTableBody');
    tableBody.innerHTML = '';
    
    let totalRent = 0;
    let totalIncome = 0;
    let totalNetIncome = 0;
    
    for (let i = 0; i < results.annualRents.length; i++) {
        const year = i + 1;
        const rent = results.annualRents[i];
        const income = results.annualIncomes[i];
        const netIncome = results.annualNetIncomes[i];
        
        totalRent += rent;
        totalIncome += income;
        totalNetIncome += netIncome;
        
        const row = document.createElement('tr');
        
        // السنة
        const yearCell = document.createElement('td');
        yearCell.textContent = formatNumber(year, useArabicNumerals);
        row.appendChild(yearCell);
        
        // الإيجار السنوي
        const rentCell = document.createElement('td');
        rentCell.textContent = formatNumber(rent, useArabicNumerals);
        row.appendChild(rentCell);
        
        // نسبة الزيادة
        const increaseCell = document.createElement('td');
        if (i > 0 && year % results.rentIncreaseInterval === 0) {
            increaseCell.textContent = formatNumber(results.rentIncreaseRate, useArabicNumerals) + '%';
        } else {
            increaseCell.textContent = '-';
        }
        row.appendChild(increaseCell);
        
        // إجمالي الدخل
        const incomeCell = document.createElement('td');
        incomeCell.textContent = formatNumber(income, useArabicNumerals);
        row.appendChild(incomeCell);
        
        // صافي الدخل
        const netIncomeCell = document.createElement('td');
        netIncomeCell.textContent = formatNumber(netIncome, useArabicNumerals);
        row.appendChild(netIncomeCell);
        
        tableBody.appendChild(row);
    }
    
    // إضافة صف الإجمالي
    const totalRow = document.createElement('tr');
    totalRow.classList.add('total-row');
    
    // عنوان الإجمالي
    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'الإجمالي';
    totalRow.appendChild(totalLabelCell);
    
    // إجمالي الإيجار
    const totalRentCell = document.createElement('td');
    totalRentCell.textContent = formatNumber(totalRent, useArabicNumerals);
    totalRow.appendChild(totalRentCell);
    
    // خلية فارغة لنسبة الزيادة
    const emptyCell = document.createElement('td');
    emptyCell.textContent = '-';
    totalRow.appendChild(emptyCell);
    
    // إجمالي الدخل
    const totalIncomeCell = document.createElement('td');
    totalIncomeCell.textContent = formatNumber(totalIncome, useArabicNumerals);
    totalRow.appendChild(totalIncomeCell);
    
    // إجمالي صافي الدخل
    const totalNetIncomeCell = document.createElement('td');
    totalNetIncomeCell.textContent = formatNumber(totalNetIncome, useArabicNumerals);
    totalRow.appendChild(totalNetIncomeCell);
    
    tableBody.appendChild(totalRow);
}

// حساب NPV لقيمة إيجار معينة
function calculateNPVForRent(rentValue) {
    if (!window.currentResults) return 0;
    
    const results = window.currentResults;
    
    // نسخ القيم الأصلية
    const originalAnnualRent = results.annualRent;
    const originalNPV = results.npv;
    const originalLandAllocation = results.landAllocation;
    
    // حساب الفرق بين الإيجار الجديد والأصلي
    const rentDifference = rentValue - originalAnnualRent;
    
    // حساب الفرق في القيمة الحالية للإيجارات
    let pvRentDifference = 0;
    
    for (let year = 1; year <= results.contractDuration; year++) {
        // حساب عدد الزيادات المطبقة
        const increaseCount = Math.floor((year - 1) / results.rentIncreaseInterval);
        
        // حساب معامل الزيادة
        const increaseFactor = Math.pow(1 + (results.rentIncreaseRate / 100), increaseCount);
        
        // تطبيق فترة السماح
        let rentDifferenceForYear = 0;
        if (year <= results.gracePeriod) {
            // خلال فترة السماح، الإيجار صفر
            rentDifferenceForYear = 0;
        } else if (year > results.gracePeriod && year <= Math.ceil(results.gracePeriod)) {
            // للسنة التي تحتوي على جزء من فترة السماح
            const remainingYear = Math.ceil(results.gracePeriod) - results.gracePeriod;
            rentDifferenceForYear = rentDifference * increaseFactor * remainingYear;
        } else {
            // بعد فترة السماح، تطبيق الإيجار الكامل مع الزيادات
            rentDifferenceForYear = rentDifference * increaseFactor;
        }
        
        // حساب القيمة الحالية للفرق في الإيجار
        const pvDifference = rentDifferenceForYear / Math.pow(1 + (results.discountRate / 100), year - 1);
        
        // إضافة القيمة الحالية إلى الفرق الإجمالي
        pvRentDifference += pvDifference;
    }
    
    // حساب NPV الجديد
    const newNPV = originalNPV - pvRentDifference;
    
    return newNPV;
}

// تحديث NPV عند تغيير قيمة الإيجار في المزلاج
function updateNPVForRent() {
    const rentSlider = document.getElementById('rentSlider');
    const rentSliderValue = document.getElementById('rentSliderValue');
    const npvForRentValue = document.getElementById('npvForRentValue');
    
    // تحديث قيمة الإيجار المعروضة
    rentSliderValue.value = rentSlider.value;
    
    // حساب NPV للإيجار الجديد
    const newNPV = calculateNPVForRent(parseFloat(rentSlider.value));
    
    // تحديد اللغة الحالية
    const currentLang = document.documentElement.lang || 'ar';
    const useArabicNumerals = (currentLang === 'ar');
    
    // تحديث قيمة NPV المعروضة
    npvForRentValue.textContent = formatNumber(newNPV, useArabicNumerals);
}

// تطبيق قيمة الإيجار المختارة
function applySelectedRent() {
    const rentSliderValue = document.getElementById('rentSliderValue');
    const selectedRent = parseFloat(rentSliderValue.value);
    
    if (!window.currentResults || isNaN(selectedRent)) return;
    
    // حساب NPV للإيجار المختار
    const newNPV = calculateNPVForRent(selectedRent);
    
    // تحديث النتائج بالقيم الجديدة
    const results = window.currentResults;
    results.annualRent = selectedRent;
    results.npv = newNPV;
    
    // إعادة حساب القيم المرتبطة
    // حساب نسبة التأجير من مخصص شراء الأرض
    results.rentToLandAllocationRatio = (results.annualRent / results.landAllocation) * 100;
    
    // إعادة حساب الإيجارات السنوية
    const updatedAnnualRents = [];
    let totalContractValue = 0;
    
    for (let year = 1; year <= results.contractDuration; year++) {
        // حساب عدد الزيادات المطبقة
        const increaseCount = Math.floor((year - 1) / results.rentIncreaseInterval);
        
        // حساب معامل الزيادة
        const increaseFactor = Math.pow(1 + (results.rentIncreaseRate / 100), increaseCount);
        
        // تطبيق فترة السماح
        let yearlyRent = 0;
        if (year <= results.gracePeriod) {
            // خلال فترة السماح، الإيجار صفر
            yearlyRent = 0;
        } else if (year > results.gracePeriod && year <= Math.ceil(results.gracePeriod)) {
            // للسنة التي تحتوي على جزء من فترة السماح
            const remainingYear = Math.ceil(results.gracePeriod) - results.gracePeriod;
            yearlyRent = results.annualRent * increaseFactor * remainingYear;
        } else {
            // بعد فترة السماح، تطبيق الإيجار الكامل مع الزيادات
            yearlyRent = results.annualRent * increaseFactor;
        }
        
        updatedAnnualRents.push(yearlyRent);
        totalContractValue += yearlyRent;
    }
    
    results.annualRents = updatedAnnualRents;
    results.totalContractValue = totalContractValue;
    
    // تحديث النتائج في واجهة المستخدم
    updateResults(results);
}

// تصدير النتائج كملف PDF
function exportResultsAsPDF() {
    if (!window.currentResults) {
        alert('يرجى حساب النتائج أولاً قبل تصدير التقرير.');
        return;
    }
    
    // تحديد اللغة الحالية
    const currentLang = document.documentElement.lang || 'ar';
    
    // إرسال البيانات إلى الخادم لإنشاء ملف PDF
    fetch('https://8085-impmpol7o10evb2cbenqt-58b58199.manusvm.computer/generate-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...window.currentResults,
            language: currentLang
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        // إنشاء رابط لتنزيل الملف
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = currentLang === 'ar' ? 'تقرير_تحليل_أجرة_العقار.pdf' : 'Real_Estate_Rent_Analysis_Report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error exporting PDF:', error);
        alert('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.');
    });
}

// إعادة تعيين النموذج
function resetForm() {
    document.getElementById('calculationForm').reset();
    document.getElementById('resultsSection').style.display = 'none';
    window.currentResults = null;
}

// تحديث قيمة مزلاج الإيجار عند تغيير القيمة في الحقل النصي
function updateSliderFromInput() {
    const rentSlider = document.getElementById('rentSlider');
    const rentSliderValue = document.getElementById('rentSliderValue');
    
    // تحديث قيمة المزلاج
    rentSlider.value = rentSliderValue.value;
    
    // تحديث NPV
    updateNPVForRent();
}

// تحويل النسب المئوية من الصيغة العادية إلى الكسور العشرية
function convertPercentageInputs() {
    const percentageInputs = [
        'rentIncreaseRate', 'capitalizationRate', 'discountRate',
        'buildingRatio', 'designCost', 'indirectCost', 'priceRiskCost',
        'netIncomeRatio', 'incomeRampUpRate'
    ];
    
    percentageInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('blur', function() {
                const value = parseFloat(this.value);
                if (!isNaN(value) && value > 0) {
                    // إذا كانت القيمة أكبر من 1، نفترض أنها بالصيغة العادية (مثل 10 بدلاً من 0.1)
                    if (value > 1) {
                        this.value = value / 100;
                    }
                }
            });
            
            // تحويل القيمة عند تحميل الصفحة
            const value = parseFloat(input.value);
            if (!isNaN(value) && value > 1) {
                input.value = value / 100;
            }
        }
    });
}

// تهيئة النموذج عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة مستمعي الأحداث للحقول التي تؤثر على المساحات
    document.getElementById('landArea').addEventListener('input', calculateAreas);
    document.getElementById('buildingCoefficient').addEventListener('input', calculateAreas);
    document.getElementById('buildingRatio').addEventListener('input', calculateAreas);
    document.getElementById('basementArea').addEventListener('input', calculateAreas);
    
    // إضافة مستمعي الأحداث للحقول التي تؤثر على التكاليف
    document.getElementById('buildingCost').addEventListener('input', calculateCosts);
    document.getElementById('siteworkCost').addEventListener('input', calculateCosts);
    document.getElementById('basementCost').addEventListener('input', calculateCosts);
    document.getElementById('designCost').addEventListener('input', calculateCosts);
    document.getElementById('indirectCost').addEventListener('input', calculateCosts);
    document.getElementById('priceRiskCost').addEventListener('input', calculateCosts);
    
    // إضافة مستمعي الأحداث للحقول التي تؤثر على الدخل
    document.getElementById('totalIncome').addEventListener('input', calculateIncome);
    document.getElementById('netIncomeRatio').addEventListener('input', calculateIncome);
    
    // إضافة مستمع الحدث لزر الحساب
    document.getElementById('calculateButton').addEventListener('click', calculateResults);
    
    // إضافة مستمع الحدث لزر إعادة التعيين
    document.getElementById('resetButton').addEventListener('click', resetForm);
    
    // إضافة مستمع الحدث لزر تصدير PDF
    document.getElementById('exportPdfButton').addEventListener('click', exportResultsAsPDF);
    
    // إضافة مستمع الحدث لمزلاج الإيجار
    document.getElementById('rentSlider').addEventListener('input', updateNPVForRent);
    
    // إضافة مستمع الحدث لحقل قيمة الإيجار
    document.getElementById('rentSliderValue').addEventListener('input', updateSliderFromInput);
    
    // إضافة مستمع الحدث لزر تطبيق القيمة
    document.getElementById('applyRentButton').addEventListener('click', applySelectedRent);
    
    // تحويل النسب المئوية
    convertPercentageInputs();
    
    // إخفاء قسم النتائج في البداية
    document.getElementById('resultsSection').style.display = 'none';
});
