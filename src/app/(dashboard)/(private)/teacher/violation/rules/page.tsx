// Component Imports
import ViolationRules from '@/views/violation/rules'
import DataError from '@/components/other/DataError'

// Data
import { fetchRules } from '@/libs/actions/rules'

const ViolationRulesPage = async () => {
  const violationRulesData = await fetchRules()

  if (!violationRulesData.result) {
    return <DataError />
  }

  return <ViolationRules violationRulesData={violationRulesData.result} />
}

export default ViolationRulesPage
