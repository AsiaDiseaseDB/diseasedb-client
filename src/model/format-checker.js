export default {
  isEmpty (ele) {
    return ele === '' || ele === null
  },
  isInt (ele) {
    if (!isNaN(ele)) {
      var tmp = parseInt(ele)
      return tmp - ele === 0
    } else {
      return false
    }
  },
  contains (arr, ele) {
    for (let i in arr) {
      if (arr[i] === ele) {
        return true
      }
    }
    return false
  },
  checkBasicSources (form) {
    var requiredCols = [
      'ReportID', 'Reporter', 'Disease', 'Country',
      'DocumentCategory', 'Journal', 'Title', 'Authors',
      'YearOfPub', 'AuthorContactNeeded', 'OpenAccess'
    ]
    var intCols = [
      'ReportID', 'YearOfPub', 'Volume',
      'Issue', 'PageFrom', 'PageTo'
    ]
    var msg = ''
    for (let i in form) {
      if (this.contains(requiredCols, i)) {
        if (this.isEmpty(form[i])) {
          msg = i + '不能为空'
          return msg
        }
      }
      if (this.contains(intCols, i)) {
        if (!this.isInt(form[i]) && form[i] !== '' && form[i] !== null) {
          msg = i + '必须是整数'
          return msg
        }
      }
    }
    return msg
  },
  checkSurvey (form) {
    var requiredCols = [
      'SurveyID', 'BasicSourcesReportID',
      'DataType', 'SurveyType'
    ]
    var intCols = [
      'SurveyID', 'BasicSourcesReportID'
    ]
  },
  checkLocation (form) {
    var requiredCols = [
      'LocationID', 'SurveyDescriptionBasicSourcesReportID',
      'SurveyDescriptionSurveyID'
    ]
    var intCols = [
      'LocationID', 'SurveyDescriptionBasicSourcesReportID',
      'SurveyDescriptionSurveyID'
    ]
    var floatCols = [
      'Latitude', 'Longitude'
    ]
  },
  checkDisease (form) {
    var requiredCols = [
      'DiseaseID', 'Species', 'LReportID',
      'LocationInformationSurveyDescriptionSurveyID',
      'LocationInformationLocationID',
      'LocationInformationLocationID1'
     ]
     var intCols = [
       'LocationInformationSurveyDescriptionSurveyID',
       'LocationInformationLocationID1', 'LReportID',
       'DiseaseID', 'NumPositiveMale', 'NumPositiveFemale',
       'NumPositive', 'NumExamineMale', 'NumExamineFemale',
       'NumExamine', 'AgeUpper', 'AgeLower'
     ]
     var floatCols = [
       'PercentPositiveMale', 'PercentPositiveFemale', 'PercentPositive'
     ]
  },
  checkIntervention (form) {
    var requiredCols = [
      'InterventionID', 'DiseaseDataDiseaseID',
      'DiseaseDataLocationInformationLocationID1',
      'DiseaseDataLReportID',
      'DiseaseDataLocationInformationSurveyDescriptionSurveyID'
    ]
    var intCols = [
      'InterventionID', 'DiseaseDataDiseaseID', 'DiseaseDataLocationInformationLocationID1',
      'DiseaseDataLReportID', 'DiseaseDataLocationInformationSurveyDescriptionSurveyID',
      'MonthsAfterBaseline', 'FrequencyPerYear', 'PeriodMonths', 'INumExamine',
      'INumPositive', 'INumExamineMale', 'INumPositiveMale', 'INumExamineFemale',
      'INumPositiveFemale'
    ]
    var floatCols = [
      'Coverage', 'IPercentPositive',
      'IPercentPositiveMale', 'IPercentPositiveFemale'
    ]
  }
}
