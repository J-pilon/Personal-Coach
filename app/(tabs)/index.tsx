import { ThemedText } from '@/components/ThemedText';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  const [todos, setTodos] = useState([
    { title: 'Buy groceries', description: 'Milk, eggs, bread, and fruit', completed: false, category: "do" },
    { title: 'Read a book', description: 'Finish reading the current novel', completed: false, category: "do" },
    { title: 'Workout', description: '30 minutes of cardio', completed: false, category: "do" },
    { title: 'Call mom', description: 'Check in and say hello', completed: false, category: "delegate" },
    { title: 'Clean the house', description: 'Vacuum and dust living room', completed: false, category: "delegate" },
    { title: 'Write journal', description: 'Reflect on the day', completed: false, category: "defer" },
    { title: 'Plan weekend trip', description: 'Research destinations', completed: false, category: "defer" },
    { title: 'Pay bills', description: 'Electricity and internet', completed: false, category: "do" },
    { title: 'Water plants', completed: false, category: "do" },
    { title: 'Organize desk', description: 'Sort papers and tidy up', completed: false, category: "do" },
  ]);

  const categoryOrder = ['do', 'defer', 'delegate'] as const;

  const groupedTodos = categoryOrder.map(category => ({
    category,
    items: todos ? todos.filter(todo => todo.category === category) : [],
  }));

  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({
    do: true,
    defer: false,
    delegate: false,
    drop: false,
  });

  const handleToggle = (idx: number) => {
    setTodos(prev => {
      const updated = prev.map((todo, i) =>
        i === idx ? { ...todo, completed: true } : todo
      );
      return [
        ...updated.filter(t => !t.completed),
        ...updated.filter(t => t.completed),
      ];
    });
  };

  const toggleAccordion = (category: string) => {
    setOpenCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <ThemedText style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 24 }}>Todo List</ThemedText>
      {groupedTodos.map(({ category, items }) => (
        <View key={category} className="mb-6">
          <Pressable
            onPress={() => toggleAccordion(category)}
            className="flex flex-row items-center justify-between px-4 py-3 bg-gray-100 rounded-md border border-gray-300 mb-3"
          >
            <View className='flex-row gap-2 items-center'>
              <Text className="text-lg font-semibold capitalize">{category}</Text>
              <Text className='border border-solid border-blue-700 bg-blue-700 text-white p-1 rounded-full w-8 text-center justify-center'>{items.filter((item) => !item.completed).length}</Text>
            </View>
            <Text className="text-xl">{openCategories[category] ? <FontAwesome name="angle-down" size={24} color="black" /> : <FontAwesome name="angle-up" size={24} color="black" />}</Text>
          </Pressable>

          {openCategories[category] && items.length > 0 && (
            <View className="pl-4">
              {items.map((todo, idx) => {
                // Find the index in the original todos array for handleToggle
                const originalIdx = todos.findIndex(
                  t => t.title === todo.title && t.category === todo.category
                );
                return (
                  <View key={originalIdx} className="flex flex-row items-center mb-4">
                    <Pressable
                      onPress={() => handleToggle(originalIdx)}
                      className={`h-6 w-6 rounded-full border-2 mr-4 ${todo.completed ? 'border-green-400 bg-green-400' : 'border-gray-400 bg-white'}`}
                    >
                      {todo.completed && (
                        <View className="h-3 w-3 rounded-full bg-white m-auto" />
                      )}
                    </Pressable>

                    <View className="flex-1">
                      <Text className={`font-bold ${todo.completed ? 'text-gray-400' : 'text-black'}`}>{todo.title}</Text>
                      {todo.description ? (
                        <Text className={`${todo.completed ? 'text-gray-400' : 'text-gray-700'}`}>{todo.description}</Text>
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
