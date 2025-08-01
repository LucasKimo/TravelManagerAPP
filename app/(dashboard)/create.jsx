import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { useBooks } from "../../hooks/useBooks"
import { useRouter } from 'expo-router'
import { useState } from 'react'

// themed components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedTextInput from "../../components/ThemedTextInput"
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const Create = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [budget, setBudget] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const { createBook } = useBooks()
  const router = useRouter()

  async function handleSubmit() {
    if (!title.trim() || !author.trim() || !description.trim()) return

    setLoading(true)

    const parsedBudget =
      budget.trim() && !isNaN(parseFloat(budget)) ? parseFloat(budget) : null
    
    // create the book
    await createBook({ 
      title,
      author, 
      description,
      budget: parsedBudget
    })

    // reset fields
    setTitle("")
    setAuthor("")
    setBudget("")
    setDescription("")

    // redirect
    router.replace("/books")

    // reset loading state
    setLoading(false) 
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <ThemedView style={styles.container} safe={true}>
        <ScrollView contentContainerStyle={styles.scroll}>
          
          <Spacer />
          <ThemedText title={true} style={styles.heading}>
            Add a New Book
          </ThemedText>
          <Spacer />
          

          <ThemedTextInput
            style={styles.input}
            placeholder="Book Title"
            value={title}
            onChangeText={setTitle}
          />
          <Spacer />

          <ThemedTextInput
            style={styles.input}
            placeholder="Author"
            value={author}
            onChangeText={setAuthor}
          />
          <Spacer />

          <ThemedTextInput
            style={styles.input}
            placeholder="Budget (optional)"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
          <Spacer />

          <ThemedTextInput
            style={styles.multiline}
            placeholder="Book Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
          <Spacer />

          <ThemedButton onPress={handleSubmit} disabled={loading}>
            <Text style={{ color: '#fff' }}>
              {loading ? "Saving..." : "Create Book"}
            </Text>
          </ThemedButton>
        </ScrollView>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  scroll: {
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
},
})