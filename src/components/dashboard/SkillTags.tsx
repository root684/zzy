import React, { useState } from 'react';

interface SkillTag {
  id: string;
  name: string;
  color: string;
  level: number;
}

interface SkillTagsProps {
  skills?: SkillTag[];
  onSkillsChange?: (skills: SkillTag[]) => void;
}

const SkillTags: React.FC<SkillTagsProps> = ({ 
  skills = [
    { id: '1', name: '数据监控', color: '#3b82f6', level: 90 },
    { id: '2', name: '故障诊断', color: '#10b981', level: 85 },
    { id: '3', name: '性能优化', color: '#f59e0b', level: 80 },
    { id: '4', name: '安全管理', color: '#ef4444', level: 95 },
    { id: '5', name: '系统集成', color: '#8b5cf6', level: 88 },
    { id: '6', name: '实时分析', color: '#06b6d4', level: 75 },
  ],
  onSkillsChange 
}) => {
  const [editingSkill, setEditingSkill] = useState<SkillTag | null>(null);
  const [newSkill, setNewSkill] = useState<Omit<SkillTag, 'id'>>({ name: '', color: '#3b82f6', level: 50 });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const skill: SkillTag = {
        ...newSkill,
        id: Date.now().toString()
      };
      const updatedSkills = [...skills, skill];
      onSkillsChange?.(updatedSkills);
      setNewSkill({ name: '', color: '#3b82f6', level: 50 });
    }
  };

  const handleUpdateSkill = (id: string, updates: Partial<SkillTag>) => {
    const updatedSkills = skills.map(skill => 
      skill.id === id ? { ...skill, ...updates } : skill
    );
    onSkillsChange?.(updatedSkills);
  };

  const handleDeleteSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    onSkillsChange?.(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">技能标签</h3>
      </div>
      
      {/* 技能标签列表 */}
      <div className="flex flex-wrap gap-3">
        {skills.map(skill => (
          <div 
            key={skill.id} 
            className="relative group"
          >
            <div 
              className="flex items-center space-x-2 px-4 py-2 rounded-full border"
              style={{ 
                borderColor: skill.color,
                backgroundColor: `${skill.color}20`,
                color: skill.color
              }}
            >
              <span>{skill.name}</span>
              <span className="text-xs opacity-75">{skill.level}%</span>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-xs"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* 添加新技能 */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="技能名称"
          className="flex-1 px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
        />
        <input
          type="color"
          className="w-10 h-10 rounded-lg cursor-pointer"
          value={newSkill.color}
          onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
        />
        <input
          type="number"
          min="0"
          max="100"
          placeholder="熟练度"
          className="w-20 px-4 py-2 bg-dark-light border border-dark-lighter rounded-lg"
          value={newSkill.level}
          onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 0 })}
        />
        <button
          className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 transition-colors"
          onClick={handleAddSkill}
        >
          添加
        </button>
      </div>
    </div>
  );
};

export default SkillTags;