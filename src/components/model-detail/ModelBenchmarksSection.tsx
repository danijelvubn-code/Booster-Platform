import { Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { benchmarkMethodology as BENCHMARK_METHODOLOGY_ROWS } from '@/data/mockData'
import {
	getOverallModelScore,
	type ModelRecord,
	overallScoreTextClass,
} from '@/lib/model-metrics'
import { cn } from '@/lib/utils'

const PUBLIC_BENCHMARKS = new Set<string>([
	'MMLU',
	'MLU',
	'HumanEval',
	'MBPP',
	'DS-1000',
	'GSM8K',
	'ARC-Challenge',
	'HellaSwag',
	'TruthfulQA',
])

type DisplayBenchmark = {
	name: string
	score: number
	proprietary: boolean
	category?: string
	maxScore?: number
}

function buildBenchmarkRows(model: ModelRecord): DisplayBenchmark[] {
	const composite = getOverallModelScore(model)
	const proprietary: DisplayBenchmark = {
		name: 'Booster',
		score: composite,
		proprietary: true,
	}
	const publicRows: DisplayBenchmark[] = model.benchmarks.map((b) => ({
		name: b.name,
		score: b.score,
		proprietary: !PUBLIC_BENCHMARKS.has(b.name),
		category: b.category,
		maxScore: b.maxScore,
	}))
	return composite > 0 ? [proprietary, ...publicRows] : publicRows
}

function SectionHeader({
	title,
	subtitle,
	action,
}: {
	title: string
	subtitle?: string
	action?: React.ReactNode
}) {
	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-body-strong text-foreground">{title}</h2>
				{action}
			</div>
			{subtitle ? (
				<p className="text-body-sm text-muted-foreground py-1">{subtitle}</p>
			) : null}
		</div>
	)
}

function BenchmarkTile({
	label,
	score,
	description,
	chips,
	empty,
}: {
	label: string
	score: number
	description: string
	chips: string[]
	empty?: boolean
}) {
	return (
		<Card className="p-0">
			<CardContent className="flex h-full flex-col gap-4 p-5">
				<div className="space-y-1">
					<p className="text-caption text-muted-foreground tracking-wider uppercase">
						{label}
					</p>
					<span
						className={cn(
							'text-h2 tabular-nums',
							empty ? 'text-muted-foreground' : overallScoreTextClass(score),
						)}
					>
						{empty ? '—' : score.toFixed(1)}
					</span>
				</div>
				<p className="text-body-sm text-muted-foreground">{description}</p>
				{chips.length > 0 ? (
					<div className="flex flex-wrap items-center gap-2">
						{chips.map((c) => (
							<Badge
								key={c}
								variant="muted"
								appearance="ghost"
								size="24"
								className="font-normal"
							>
								{c}
							</Badge>
						))}
					</div>
				) : null}
			</CardContent>
		</Card>
	)
}

function BenchmarksDetailSheet({
	model,
	rows,
	defaultTab = 'booster',
	children,
}: {
	model: ModelRecord
	rows: DisplayBenchmark[]
	defaultTab?: 'booster' | 'public'
	children: React.ReactNode
}) {
	const proprietaryRows = rows.filter((b) => b.proprietary)
	const publicRows = rows.filter((b) => !b.proprietary)

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent
				side="right"
				className="inset-y-4 left-4 right-4 flex h-auto w-auto flex-col gap-0 overflow-hidden rounded-xl border border-border p-0 shadow-xl lg:left-auto lg:w-[860px] lg:max-w-[860px]"
				aria-describedby={undefined}
			>
				<SheetHeader className="h-[60px] flex-row items-center justify-start border-b border-border px-5 py-0 space-y-0">
					<SheetTitle>Benchmark details — {model.name}</SheetTitle>
				</SheetHeader>
				<Tabs
					defaultValue={defaultTab}
					className="flex flex-1 flex-col overflow-hidden"
				>
					<div className="border-b border-border px-5 py-3">
						<TabsList>
							<TabsTrigger value="booster">Booster methodology</TabsTrigger>
							<TabsTrigger value="public">Public benchmarks</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent
						value="booster"
						className="mt-0 flex-1 overflow-y-auto px-5 py-4 data-[state=inactive]:hidden"
					>
						<div className="space-y-4">
							<p className="text-body-sm text-muted-foreground">
								Booster Fit Score is an internal composite that combines
								capability evaluations, real-world endpoint traces, and energy
								efficiency.
							</p>
							{proprietaryRows.length > 0 ? (
								<div className="rounded-md border border-border">
									<div className="divide-y divide-border">
										{proprietaryRows.map((b) => (
											<div
												key={b.name}
												className="flex items-center justify-between gap-3 px-4 py-3"
											>
												<span className="text-body-sm-strong text-foreground">
													{b.name}
												</span>
												<span
													className={cn(
														'text-body-strong tabular-nums',
														overallScoreTextClass(b.score),
													)}
												>
													{b.score.toFixed(1)}
												</span>
											</div>
										))}
									</div>
								</div>
							) : (
								<p className="text-body-sm text-muted-foreground">
									No proprietary score reported for this model yet.
								</p>
							)}
						</div>
					</TabsContent>
					<TabsContent
						value="public"
						className="mt-0 flex-1 overflow-y-auto px-5 py-4 data-[state=inactive]:hidden"
					>
						{publicRows.length > 0 ? (
							<div className="space-y-4">
								<Card className="overflow-hidden p-0">
									<Table size="md">
										<TableHeader>
											<TableRow className="hover:bg-transparent">
												<TableHead className="text-caption-strong text-muted-foreground">
													Benchmark
												</TableHead>
												<TableHead className="text-caption-strong text-muted-foreground">
													Field
												</TableHead>
												<TableHead className="text-right text-caption-strong text-muted-foreground">
													Score
												</TableHead>
												<TableHead className="text-right text-caption-strong text-muted-foreground">
													Normalized
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{publicRows.map((b) => {
												const max = b.maxScore ?? 100
												const pct = (b.score / max) * 100
												return (
													<TableRow key={b.name}>
														<TableCell>
															<span className="text-body-sm-strong text-foreground">
																{b.name}
															</span>
														</TableCell>
														<TableCell>
															<span className="text-body-sm text-muted-foreground">
																{b.category ?? 'General'}
															</span>
														</TableCell>
														<TableCell className="text-right">
															<span className="text-body-sm-strong tabular-nums text-foreground">
																{b.score.toFixed(1)}
															</span>
														</TableCell>
														<TableCell className="text-right">
															<span
																className={cn(
																	'text-body-sm-strong tabular-nums',
																	overallScoreTextClass(pct),
																)}
															>
																{pct.toFixed(1)}%
															</span>
														</TableCell>
													</TableRow>
												)
											})}
										</TableBody>
									</Table>
								</Card>
								<Separator />
								<div className="space-y-2">
									<h3 className="text-body-strong text-foreground">
										Evaluation methodology matrix
									</h3>
									<p className="text-body-sm text-muted-foreground">
										Full benchmark stack used to build the public signal,
										organized by category weighting and scoring method.
									</p>
								</div>
								<Card className="p-0">
									<Table size="md">
										<TableHeader>
											<TableRow className="hover:bg-transparent">
												<TableHead className="text-caption-strong text-muted-foreground">
													Category
												</TableHead>
												<TableHead className="text-caption-strong text-muted-foreground">
													Evaluation
												</TableHead>
												<TableHead className="text-caption-strong text-muted-foreground">
													Field
												</TableHead>
												<TableHead className="text-caption-strong text-muted-foreground">
													Questions
												</TableHead>
												<TableHead className="text-center text-caption-strong text-muted-foreground">
													Repeats
												</TableHead>
												<TableHead className="text-caption-strong text-muted-foreground">
													Output
												</TableHead>
												<TableHead className="text-caption-strong text-muted-foreground">
													Scoring
												</TableHead>
												<TableHead className="text-right text-caption-strong text-muted-foreground">
													Weight
												</TableHead>
												<TableHead className="text-center text-caption-strong text-muted-foreground">
													Tools
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{BENCHMARK_METHODOLOGY_ROWS.map(
												(
													row: (typeof BENCHMARK_METHODOLOGY_ROWS)[number],
													index: number,
												) => {
													const previous = BENCHMARK_METHODOLOGY_ROWS[index - 1]
													const showCategory =
														!previous || previous.category !== row.category
													return (
														<TableRow key={`${row.evaluation}-${index}`}>
															<TableCell>
																{showCategory ? (
																	<span className="text-body-sm-strong text-foreground">
																		{row.category}
																	</span>
																) : (
																	<span className="text-body-sm text-muted-foreground">
																		—
																	</span>
																)}
															</TableCell>
															<TableCell>
																<span className="text-body-sm-strong text-foreground">
																	{row.evaluation}
																</span>
															</TableCell>
															<TableCell>
																<span className="text-body-sm text-foreground">
																	{row.field}
																</span>
															</TableCell>
															<TableCell>
																<span className="text-body-sm text-foreground">
																	{row.questions}
																</span>
															</TableCell>
															<TableCell className="text-center">
																<span className="text-body-sm tabular-nums text-foreground">
																	{row.repeats}
																</span>
															</TableCell>
															<TableCell>
																<span className="text-body-sm text-foreground">
																	{row.responseType}
																</span>
															</TableCell>
															<TableCell>
																<span className="text-body-sm text-foreground">
																	{row.scoring}
																</span>
															</TableCell>
															<TableCell className="text-right">
																<span className="text-body-sm-strong tabular-nums text-foreground">
																	{row.weighting}
																</span>
															</TableCell>
															<TableCell className="text-center">
																{row.toolUsage ? (
																	<Badge
																		variant="success"
																		appearance="ghost"
																		size="20"
																		className="font-normal"
																		leadingIcon={<Check aria-hidden />}
																	>
																		Yes
																	</Badge>
																) : (
																	<Badge
																		variant="muted"
																		appearance="ghost"
																		size="20"
																		className="font-normal"
																		leadingIcon={<X aria-hidden />}
																	>
																		No
																	</Badge>
																)}
															</TableCell>
														</TableRow>
													)
												},
											)}
										</TableBody>
									</Table>
								</Card>
							</div>
						) : (
							<p className="text-body-sm text-muted-foreground">
								No public benchmarks reported for this model.
							</p>
						)}
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	)
}

interface ModelBenchmarksSectionProps {
	model: ModelRecord
}

export function ModelBenchmarksSection({ model }: ModelBenchmarksSectionProps) {
	const qualityScore = getOverallModelScore(model)
	const benchmarkRows = buildBenchmarkRows(model)
	const publicRows = benchmarkRows.filter((b) => !b.proprietary)
	const publicAvg = publicRows.length
		? publicRows.reduce(
				(sum, b) => sum + (b.score / (b.maxScore ?? 100)) * 100,
				0,
			) / publicRows.length
		: 0
	const publicCategories = Array.from(
		new Set(
			publicRows.map((b) => b.category).filter((c): c is string => Boolean(c)),
		),
	)
	const publicDescription = publicRows.length
		? `Average across ${publicRows.length} public framework${publicRows.length === 1 ? '' : 's'}${publicCategories.length > 0 ? ` covering ${publicCategories.join(', ').toLowerCase()}` : ''}.`
		: 'No public benchmarks reported for this model.'

	return (
		<section className="space-y-3">
			<SectionHeader
				title="Benchmarks"
				subtitle="Booster's proprietary score side by side with public benchmark frameworks."
				action={
					<BenchmarksDetailSheet model={model} rows={benchmarkRows}>
						<Button variant="outline" size="sm">
							Detailed View
						</Button>
					</BenchmarksDetailSheet>
				}
			/>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<BenchmarkTile
					label="Booster Score"
					score={qualityScore}
					empty={qualityScore <= 0}
					description="Booster's internal fit evaluation combining capability scores, real-world traces, and energy efficiency."
					chips={['Proprietary methodology']}
				/>
				<BenchmarkTile
					label="Public Benchmark Average"
					score={publicAvg}
					empty={publicRows.length === 0}
					description={publicDescription}
					chips={publicCategories}
				/>
			</div>
		</section>
	)
}
