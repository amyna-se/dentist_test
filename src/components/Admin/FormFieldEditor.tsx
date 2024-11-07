import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { OnboardingStep } from '../../stores/onboarding';

// Rest of the file remains the same...