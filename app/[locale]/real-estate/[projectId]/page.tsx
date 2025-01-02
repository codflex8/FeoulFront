import React from 'react'

const page = async (
  {
    params
  }: {
    params: Promise<{ projectId: string }>
  }) => {
  const projectId = (await params).projectId;

  return (
    <div>
      Project1
    </div>
  )
}

export default page
