import React, { useState } from 'react'

import {
  actions,
  AppStatus,
  thunkActions,
  useAppDispatch,
  useAppSelector,
} from 'store/provider'
import { Header } from 'components/header'
import { Chat } from 'components/chat/chat'
import SearchInput from 'components/search_input'
import { ReactComponent as ChatIcon } from 'images/chat_icon.svg'
import { ReactComponent as ElasticLogo } from 'images/elastic_logo.svg'
import { SearchResults } from './components/search_results'
import Ask from 'components/ask'

const App = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.status)
  const sources = useAppSelector((state) => state.sources)
  const [summary, ...messages] = useAppSelector((state) => state.conversation)
  const hasSummary = useAppSelector(
    (state) => !!state.conversation?.[0]?.content
  )
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearch = (query: string) => {
    dispatch(thunkActions.search(query))
  }
  const handleSendChatMessage = (query: string) => {
    dispatch(thunkActions.askQuestion(query))
  }
  const handleAbortRequest = () => {
    dispatch(thunkActions.abortRequest())
  }
  const handleToggleSource = (name) => {
    dispatch(actions.sourceToggle({ name }))
  }
  const handleSourceClick = (name) => {
    dispatch(actions.sourceToggle({ name, expanded: true }))

    setTimeout(() => {
      document
        .querySelector(`[data-source="${name}"]`)
        ?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const suggestedQueries = [
    'What is our work from home policy?',
    "What's the NASA sales team?",
    'Does the company own my side project?',
    'What job openings do we have?',
    'How does compensation work?',
  ]

  return (
    <>
      <Header />
      {/* <div className="p-4 max-w-2xl mx-auto">
      </div> */}
      <Ask />
    </>
  )
}

export default App
