import { getCurrentUserId } from '@/lib/auth/get-current-user'
import { getModelSelectorData } from '@/lib/model-selector/get-model-selector-data'

import { Chat } from '@/components/chat'

export default async function Page() {
  const isCloudDeployment = process.env.MORPHIC_CLOUD_DEPLOYMENT === 'true'

  let userId: string | null = null
  let modelSelectorData = {
    enabled: false,
    modelsByProvider: {},
    selectedModelKey: '',
    hasAvailableModels: false
  }

  try {
    userId = await getCurrentUserId()
  } catch (error) {
    console.error('Failed to resolve current user for the home page:', error)
  }

  try {
    modelSelectorData = await getModelSelectorData()
  } catch (error) {
    console.error('Failed to load model selector data:', error)
  }

  return (
    <Chat
      isGuest={!userId}
      isCloudDeployment={isCloudDeployment}
      modelSelectorData={modelSelectorData}
    />
  )
}
