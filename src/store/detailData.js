const detail = {
  basicDetail: {
    reporterOptions: [
      'Lai Yingsi',
      'Du zhiheng',
      'Huang Yun',
      'Wang Xinwei',
      'He Wenjun',
      'Dai Bofeng'
    ],
    diseaseOptions: [
      'STH', 'dengue',
      'foodborne trematodiases',
      'malaria hfmd', 'TB',
      'Hepatitis B', 'diarrhea',
      'iron deficient anemia',
      'other'
    ],
    countryOptions: [
      'China', 'Myanmar', 'Cambodia',
      'Indonesia', 'Laos', 'Malaysia',
      'Philippines', 'Thailand', 'Vietnam',
      'India', 'Bangladesh', 'Bhutan',
      'Nepal', 'Pakistan'
    ],
    //
    documentCategoryOptions: [
      'peer-review literature',
      'working report',
      'thesis',
      'personal communication',
      'other database',
      'others'
    ]
  },
  surveyDetail: {
    dataTypeOptions: [
      'prevalence', 'incidence',
      'outbreak', 'others'
    ],
    surveyTypeOptions: [
      'community',
      'school-based',
      'hospital-based',
      'under-school-aged children',
      'others'
    ],
    monthOptions: [
      'Jan','Feb','Mar','Apr',
      'May','Jun','Jul','Aug',
      'Sep','Oct','Nov','Dec'
    ]
  }
};

module.exports = detail;
