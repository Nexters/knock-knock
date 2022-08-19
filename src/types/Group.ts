import { InferQueryOutput } from 'src/utils/trpc'

export type GroupsOutput = InferQueryOutput<'groups.groups'>

export type SingleGroupOutput = InferQueryOutput<'groups.single-group'>
