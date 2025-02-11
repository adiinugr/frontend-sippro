// Component Imports
import ViolationCategoryList from '@/views/violation/category'

// Data
import { fetchRuleCategories } from '@/libs/actions/ruleCategories'

// Components
import DataError from '@/components/other/DataError'

const ViolationCategoryPage = async () => {
  const ruleCategoryData = await fetchRuleCategories()

  if (!ruleCategoryData.result) {
    return <DataError />
  }

  return <ViolationCategoryList ruleCategoryData={ruleCategoryData.result} />
}

export default ViolationCategoryPage
