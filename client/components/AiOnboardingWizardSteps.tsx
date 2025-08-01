import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from "./buttons/PrimaryButton";

export interface GoalDescriptionStepProps {
  goalDescription: string,
  setGoalDescription: (text: string) => void,
  handleSubmit: () => void,
  isLoading: boolean
}

export interface AiResponseStepProps {
  aiResponse: any,
  isSmartGoalResponse: (response: any) => boolean,
  formatMultiPeriodSmartGoalResponse: (response: any) => Record<string, Record<string, string>>,
  handleEditGoal: () => void,
  setCurrentStepIndex: (index: number) => void
}

export interface ConfirmationStepProps {
  aiResponse: any,
  isSmartGoalResponse: (response: any) => boolean,
  formatMultiPeriodSmartGoalResponse: (response: any) => Record<string, Record<string, string>>,
  handleEditGoal: () => void,
  handleConfirmGoal: () => void
}

const GoalDescriptionStep = ({ goalDescription, setGoalDescription, handleSubmit, isLoading }: GoalDescriptionStepProps) => (
  <View className="mb-8">
    <View className="mb-5">
      <Text className="mb-2 text-lg font-semibold text-[#F1F5F9]">
        Describe what you want to achieve
      </Text>
      <Text className="mb-3 text-sm text-[#E6FAFF] opacity-70">
        Tell us what you want to accomplish. We&apos;ll create SMART goals for 1 month, 3 months, and 6 months. For example: &ldquo;I want to improve my fitness and run a marathon&rdquo; or &ldquo;I want to learn web development and build my own website&rdquo;
      </Text>
      <TextInput
        className="border border-cyan-400 rounded-lg p-3 text-base min-h-[120px] text-[#E6FAFF] bg-slate-800"
        placeholder="e.g., I want to improve my fitness and run a marathon, or learn web development and build my own website..."
        placeholderTextColor="#708090"
        value={goalDescription}
        onChangeText={setGoalDescription}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
    </View>

    <PrimaryButton
      title="Generate SMART Goal"
      loadingText="Generating your SMART goal..."
      onPress={handleSubmit}
      isLoading={isLoading}
      icon="sparkles"
      className="mt-5"
    />
  </View>
);

const AiResponseStep = ({ aiResponse, isSmartGoalResponse, formatMultiPeriodSmartGoalResponse, handleEditGoal, setCurrentStepIndex }: AiResponseStepProps) => {
  if (!aiResponse || !isSmartGoalResponse(aiResponse)) {
    return (
      <View className="mb-8">
        <Text className="mt-5 text-base text-center text-red-400">
          Unable to generate SMART goals. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="mb-8">
      <View className="p-5 rounded-xl border border-cyan-400 bg-slate-800">
        <View className="flex-row items-center mb-4">
          <Ionicons name="checkmark-circle" size={24} color="#33CFFF" />
          <Text className="ml-3 text-xl font-bold text-[#E6FAFF]">
            Your SMART Goals
          </Text>
        </View>

        <View className="p-4 mb-4 rounded-lg bg-slate-700">
          {Object.entries(formatMultiPeriodSmartGoalResponse(aiResponse.response)).map(([goalTitle, goalDetails]) => (
            <View key={goalTitle} className="mb-4 last:mb-0">
              <Text className="mb-2 text-lg font-semibold text-cyan-400">
                {goalTitle}
              </Text>
              {Object.entries(goalDetails).map(([detailKey, detailValue]) => (
                <View key={detailKey} className="mb-2">
                  <Text className="text-sm font-medium text-slate-300">
                    {detailKey}:
                  </Text>
                  <Text className="text-sm text-[#E6FAFF] ml-2">
                    {detailValue}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View className="pt-3 border-t border-slate-600">
          <Text className="mb-1 text-xs text-slate-400">
            Context used: {aiResponse.context_used ? 'Yes' : 'No'}
          </Text>
          <Text className="mb-1 text-xs text-slate-400">
            Request ID: {aiResponse.request_id}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-3 mt-5">
        <TouchableOpacity
          className="flex-row flex-1 justify-center items-center px-5 py-3 rounded-lg border border-cyan-400"
          onPress={handleEditGoal}
        >
          <Ionicons name="create-outline" size={20} color="#33CFFF" />
          <Text className="ml-2 text-base font-semibold text-cyan-400">
            Edit
          </Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Looks Good!"
          onPress={() => setCurrentStepIndex(2)}
          icon="arrow-forward"
          className="flex-1"
        />
      </View>
    </View>
  );
};

const ConfirmationStep = ({ aiResponse, isSmartGoalResponse, formatMultiPeriodSmartGoalResponse, handleEditGoal, handleConfirmGoal }: ConfirmationStepProps) => (
  <View className="mb-8">
    <View className="items-center mb-5">
      <View className="items-center mb-4">
        <Ionicons name="checkmark-circle" size={32} color="#33CFFF" />
        <Text className="mt-2 text-2xl font-bold text-[#E6FAFF]">
          Ready to Save Your Goals?
        </Text>
      </View>

      <Text className="mb-6 text-base leading-6 text-center text-[#E6FAFF]">
        Your SMART goals for 1 month, 3 months, and 6 months will be saved and you can start tracking your progress. You can always edit or add more goals later.
      </Text>

      <View className="p-4 w-full rounded-lg bg-slate-800">
        <Text className="mb-2 text-base font-semibold text-[#E6FAFF]">
          Goals Preview:
        </Text>
        {aiResponse && isSmartGoalResponse(aiResponse) ? (
          Object.entries(formatMultiPeriodSmartGoalResponse(aiResponse.response)).map(([goalTitle, goalDetails]) => (
            <View key={goalTitle} className="mb-3 last:mb-0">
              <Text className="mb-1 text-sm font-semibold text-cyan-400">
                {goalTitle}
              </Text>
              {Object.entries(goalDetails).map(([detailKey, detailValue]) => (
                <View key={detailKey} className="mb-1">
                  <Text className="text-xs font-medium text-slate-300">
                    {detailKey}:
                  </Text>
                  <Text className="text-xs text-[#E6FAFF] ml-2">
                    {detailValue}
                  </Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text className="text-sm leading-5 text-[#E6FAFF]">
            Goals preview not available
          </Text>
        )}
      </View>
    </View>

    <View className="flex-row gap-3 mt-5">
      <TouchableOpacity
        className="flex-row flex-1 justify-center items-center px-5 py-3 rounded-lg border border-cyan-400"
        onPress={handleEditGoal}
      >
        <Ionicons name="arrow-back" size={20} color="#33CFFF" />
        <Text className="ml-2 text-base font-semibold text-cyan-400">
          Edit
        </Text>
      </TouchableOpacity>

      <PrimaryButton
        title="Save & Continue"
        onPress={handleConfirmGoal}
        icon="checkmark"
        className="flex-1"
      />
    </View>
  </View>
);

export { GoalDescriptionStep, AiResponseStep, ConfirmationStep }