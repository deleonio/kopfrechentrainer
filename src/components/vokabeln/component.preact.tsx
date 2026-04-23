import { Card, Empty, message, Space, Tag, Typography } from 'antd';
import Button from 'antd/es/button';
import { JSX } from 'preact';

import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { VokabelnController } from './controller';

const { Text, Title } = Typography;

export class VokabelnComponent extends ReactComponent<unknown, VokabelnController> implements GenericComponent {
	public readonly ctrl: VokabelnController = new VokabelnController();
	private showAnswer = false;
	private isReverseDirection = Math.random() >= 0.5;

	private randomizeDirection(): void {
		this.isReverseDirection = Math.random() >= 0.5;
	}

	public render(): JSX.Element {
		const currentEntry = this.ctrl.getCurrentEntry();
		const prompt = this.isReverseDirection ? currentEntry?.answer : currentEntry?.question;
		const solution = this.isReverseDirection ? currentEntry?.question : currentEntry?.answer;
		const total = this.ctrl.entries.length;
		const current = total === 0 ? 0 : this.ctrl.currentPosition + 1;
		return (
			<div>
				<h1>Vokabeln trainieren</h1>
				{!currentEntry && (
					<Card>
						<Empty description="Noch keine Vokabeln hinterlegt. Bitte im Profil eine Wortliste speichern." image={Empty.PRESENTED_IMAGE_SIMPLE} />
					</Card>
				)}
				{currentEntry && (
					<Card bodyStyle={{ padding: '16px 16px 20px 16px' }}>
						<Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
							<Tag color="blue" style={{ alignSelf: 'center', fontSize: '14px', padding: '6px 12px' }}>
								{current} / {total}
							</Tag>
							<Title level={4} style={{ marginBottom: 0 }}>
								Übersetze
							</Title>
							<Text strong style={{ fontSize: '32px', lineHeight: 1.2, display: 'block', minHeight: '72px' }}>
								{prompt}
							</Text>
							{this.showAnswer && (
								<>
									<Title level={5} style={{ marginBottom: 0 }}>
										Antwort
									</Title>
									<Text style={{ fontSize: '28px', lineHeight: 1.2, display: 'block', minHeight: '64px' }}>{solution}</Text>
								</>
							)}
							<Button
								type="primary"
								size="large"
								block
								style={{ height: '56px', fontSize: '20px', fontWeight: 'bold' }}
								onClick={() => {
									if (this.showAnswer) {
										this.showAnswer = false;
										this.ctrl.nextEntry();
										this.randomizeDirection();
									} else {
										this.showAnswer = true;
										message.info('Antwort eingeblendet.');
									}
									this.forceUpdate();
								}}
							>
								{this.showAnswer ? 'Nächste Vokabel' : 'Antwort anzeigen'}
							</Button>
						</Space>
					</Card>
				)}
			</div>
		);
	}
}
