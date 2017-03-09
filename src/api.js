import axios from 'axios'

//  为form中的属性值前后加上单引号
function addQuote(form, ex) {
  var newObj = {}
  for (let i in form) {
    if (ex !== undefined && !ex.includes(i)) {
      newObj[i] = '\'' + form[i] + '\''
    } else {
      newObj[i] = form[i]
    }
  }
  return newObj
}

//  返回对应类型数据表的ID，若type对应表不存在，返回-1
function getID(type, data) {
  switch (type) {
    case 'Basic Sources':
      return data.ReportID
      break
    case 'Survey Description':
      return data.SurveyID
      break
    case 'Location Information':
      return data.LocationID
      break
    case 'Disease Data':
      return data.DiseaseID
      break
    case 'Intervention Data':
      return data.InterventionID
    default:
      return -1
  }
}

//  依照type对data中的属性值前后加上单引号
function getHandledData(type, data) {
  var ex = {
    basicSources: ['ReportID', 'YearOfPub', 'Volume', 'Issue', 'PageFrom', 'PageTo'],
    survey: ['SurveyID', 'BasicSources_ReportID'],
    location: [
      'LocationID', 'SurveyDescription_BasicSources_ReportID',
      'SurveyDescription_SurveyID', 'Latitude', 'Longitude'
    ],
    disease: [
      'DiseaseID', 'AgeLower', 'AgeUpper',
      'NumExamine', 'NumPositive', 'PercentPositive',
      'NumExamineMale', 'NumPositiveMale', 'Percent_positive_male',
      'NumExamineFemale', 'NumPositiveFemale', 'PercentPositiveFemale'
    ],
    intervention: [
      'InterventionID', 'MonthsAfterBaseline', 'FrequencyAfterYear',
      'PeriodMonths', 'Coverage', 'INumExamine',
      'INumPositive', 'IPercentPositive', 'INumExamineMale',
      'INumPositiveMale', 'IPercentPositiveMale', 'INumExamineFemale',
      'INumPositiveFemale', 'IPercentPositiveFemale', 'DiseaseDataDiseaseID',
      'DiseaseDataLocationInformationLocationID1', 'DiseaseDataLReportID',
      'DiseaseDataLocationInformationSurveyDescriptionSurveyID'
    ]
  }
  switch (type) {
    case 'Basic Sources':
      return addQuote(data, ex.basicSources)
      console.log(handledData)
      break
    case 'Survey Description':
      return addQuote(data, ex.survey)
      break
    case 'Location Information':
      return addQuote(data, ex.location)
      break
    case 'Disease Data':
      return addQuote(data, ex.disease)
      break
    case 'Intervention Data':
      return addQuote(data, ex.intervention)
    default:
      console.log('type error')
  }
}

export default {
  login: function(name, password) {
    const url = '/loginReq'
  },
  getIdTree: function(id) {
    const url = '/getidtree'
    return axios.post(url, {
      id: id
    })
  },
  query: function(id, condition, context) {
    const url = '/query'
    axios.post(url, {
      id: id,
      condition: condition
    }).then(function(res) {
      console.log(res)
      if (res.data.result !== null && res.data.result !== undefined) {
        context.tableData = []  //  清空上次搜索结果
        for (let i in res.data.result) {
          context.tableData.push({
            id: res.data.result[i].ReportID,
            title: res.data.result[i].Title,
            author: res.data.result[i].Authors,
            disease: res.data.result[i].Disease,
            reporter: res.data.result[i].Reporter,
            time: res.data.result[i].YearOfPub
          })
        }
      } else {
        console.log('>> /query Error \n' + res.data.err)
      }
      context.isLoading = false
    }).catch(function(err) {
      console.log('>> /query catch Error \n' + err)
      context.isLoading = false
    })
  },
  queryNext: function(type, id) {
    const url = '/querynext'
  },
  add: function(type, data, context) {
    var that = this
    const url = '/add'
    var handledData = getHandledData(type, data)
    axios.post(url, {
        type: type,
        data: handledData
      })
      .then(function(res) {
        console.log(res)
        if (res.data.success == true) {
          setTimeout(function() {
            context.$notify({
                title: '保存成功',
                message: '提交了一条' + type,
                type: 'success'
            })
          }, 2000)
        } else {
          //  若是由于重复id导致的错误，调用editAPI进行更新数据的操作
          if (res.data.err.errno == 1062) {
            that.edit(type, getID(type, data), data, context)
          } else {
            console.log('>> /add Error: \n' + res.data.err)
          }
        }
      })
      .catch(function(err) {
        console.log('>> /add catch Error' + err)
      })
  },
  edit: function(type, id, data, context) {
    const url = '/edit'
    var handledData = data
    axios.post(url, {
      type: type,
      id: id,
      data: handledData
    })
    .then(function(res) {
      if (context === undefined) {
        console.log('>> /edit Error: undefined context')
      } else {
        if (res.data.success == true) {
          setTimeout(function() {
            context.$notify({
                title: '更改成功',
                message: '修改了一条' + type,
                type: 'success'
            })
          }, 2000)
        } else {
          console.log('>> /edit Error:')
          console.log(res.data.err)
        }
      }
    })
    .catch(function(err) {
      console.log('>> /edit catch Error: \n' + err)
    })
  }
}
